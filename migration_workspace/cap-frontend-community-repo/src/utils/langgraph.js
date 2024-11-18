import {
    END,
    START,
    StateGraph,
    Annotation,
} from "@langchain/langgraph/web";
import { ChatOpenAI } from "@langchain/openai";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import { z } from "zod";
import { TableSchema } from "../tools/types/table.js";
import { ChartSchema } from "../tools/types/chart.js";
import { fetchPrompt } from "./dynamodb.js";


// TODO: Remove hardcoded responses
const cachedResponses = JSON.stringify({
    "What is AGAILE AI?": "AGAILE AI is a company dedicated to simplifying complex processes and enhancing customer engagement through scalable AI tools for business growth. Our solutions transform workflows with AI, sparking innovation, efficiency, and growth. For more information, visit our website: https://agaile.ai/",
    "What is AGAILE AI's mission?": "AGAILE AI’s mission is to simplify complex processes and enhance customer engagement with scalable AI tools for business growth.",
    "What is AGAILE AI's vision?": "Our vision is to transform workflows with scalable AI to spark innovation, efficiency, and growth.",
    "Where can I learn more about AGAILE AI?": "You can visit our About page to learn more about our company: https://agaile.ai/about/",
    "Who are the key leaders in AGAILE AI?": "Our leadership team includes Ivo Titscher (Co-founder and CEO), Pranav Dhoolia (Co-founder and Chief Development Officer), Joachim Kohl (Co-founder and Chief Product Officer), and Tobias Heinz (Head of Infrastructure). Learn more about the team at https://agaile.ai/team/",
    "What products are offered by you?": `
    Here is an overview of our main products. We transform workflows with scalable AI to spark innovation, efficiency, and growth. For more information, visit our Products page:
    
    \n\n| Product           | Description                                                                                       | Link                                                        |\n|-------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------|\n| **ConvertAI**     | AI-powered solution to help convert website visitors into clients.                                | [Learn more](https://agaile.ai/products/products-1/)        |\n| **Zoho AI Assistant** | Enhances customer service efficiency with AI.                                                 | [Learn more](https://agaile.ai/products/products-2/)        |\n| **CAP-AI-PLATFORM**   | A scalable AI solution for enterprises.                                                      | [Learn more](https://agaile.ai/products/products-3/)        |
    
    Our products are very comprehensive and designed to meet the needs of businesses of all sizes. For more information, visit our Products page.
    `,
    "How can I contact AGAILE AI?": "You can reach us via:\n- Email: support@agaile.com\n- Phone: +1 (302) 455 7553\n- Office Address: AGAILE Inc., 8 The Green #17199, Dover, DE, 19901, United States\n- Visit our Contact page at https://agaile.ai/contact/",
    "Where can I get a general overview of AGAILE AI's offerings?": "You can learn about our scalable AI solutions on our Home page at https://agaile.ai/",
    "What should I do if I have a greeting or general question?": "Hello! How can I assist you today? Feel free to ask about our company, products, or any specific information you're interested in.",
    "What should I do if I have a question that's not answered here?": "I don’t have enough information on this topic. Please consider asking another question based on the provided information."
})

const model = new ChatOpenAI({
    apiKey:
        "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",
    dangerouslyAllowBrowser: true,
    model: "gpt-4o-mini",
    temperature: 0
});

// Define the root state with annotations to handle a history of messages
const GraphState = Annotation.Root({
    messages: Annotation({
        reducer: (x, y) => x.concat(y),
    }),
    toolName: Annotation(),
    data: Annotation(),
    match: Annotation(),
});

// Decision node to route the message to the appropriate conversion type
const decideConversionNode = async (state) => {
    const messageHistory = state.messages;
    const latestMessageContent = messageHistory[messageHistory.length - 1].content;
    const secondLastMessageContent = messageHistory.length > 1
        ? messageHistory[messageHistory.length - 2].content
        : ""; // Fallback if there’s only one message

    console.log("Latest message content:", latestMessageContent);
    console.log("Second last message content:", secondLastMessageContent);

    // Combine the last two messages for a richer context
    const combinedContent = `${secondLastMessageContent}\n\n${latestMessageContent}`;
    console.log("Deciding conversion type based on the last two messages:", combinedContent);

    const result = await model.withStructuredOutput(
        z.object({
            conversionType: z.enum(["display_basic", "display_table", "display_chart"]).describe("Conversion type: 'display_basic' for no conversion, 'display_table' for table conversion, 'display_chart' for chart conversion"),
        })
    ).invoke(`Analyze the following text to determine its best representation:
        - 'display_basic' if it should remain as-is.
        - 'display_table' if it has characteristics of tabular data.
        - 'display_chart' if it has characteristics suited for a graphical chart.
        
        ---
        DATA 
        ---
        
        ${combinedContent}`
    );

    return {
        toolName: result.conversionType,
        data: latestMessageContent, // Only return the latest message content for conversion
    };
};

// Find cached response
const findResponse = async (state) => {
    const prompt = await fetchPrompt();
    const data = prompt.Instruction.S;
    const messageHistory = state.messages;
    const latestMessageContent = messageHistory[messageHistory.length - 1].content;
    console.log("Finding cached response for:", latestMessageContent);
    console.log("Data:", data);

    const response = await model.withStructuredOutput(z.object
        ({
            content: z.string().describe("The answer to the question from the data"),
            match: z.boolean().describe("Whether the answer was found in the data")
        })
    ).invoke(
        `Try to find an answer to the question from the following data. 
        Return the answer and a boolean indicating if the question is in scope of the data and can be answered from the data.

        The boolean should be true if the question can be answered from the data, otherwise false.

        ---
        QUESTION
        ---
        ${latestMessageContent}

        ---
        DATA
        ---
        ${data}
        `
    );

    return {
        data: response.content,
        match: response.match,
    };
}

// Node function to convert message directly to table format
const convertToTable = async (state) => {
    const messageContent = state.data;
    console.log("Converting to table format:", messageContent);
    const toolName = "display_table";
    const data = await adaptToSchema(
        `Convert the following text to a JSON format that matches this schema:
        Keep all the text same. Only format the table content. 
        Add a detailed preText and postText to the JSON.
        IMPORTANT: CONVERT ANY MARKDOWN TEXT INSIDE THE TABLE (**Sample Bold**, [sample link](https://link.com)), TO PLAINTEXT (Sample Bold, https://link.com).
        You must always return valid JSON fenced by a markdown code block. Do not return any additional text.
        ${messageContent}`,
        TableSchema);
    return { toolName, data };
};

// Node function to convert message directly to chart format
const convertToChart = async (state) => {
    const messageContent = state.data;
    console.log("Converting to chart format:", messageContent);
    const toolName = "display_chart";
    const data = await adaptToSchema(
        `Convert the following text to a JSON format that matches this schema:
        The JSON should contain a "Chart" object with two keys: "data" and "config".
        
        - "data" is an array where each entry is a key value pair, the first entry is the x-axis and all subsequent entries are on the y-axis. e.g.:
            "data": [
                { "x": "2", "y1": 1200, "y2": 850 },
                { "x": "4", "y1": 1300, "y2": 900 }
            ],

        - "config" is an object containing configuration details for each bar: e.g.:
            "config": {
                "y1": { "label": "Mobile", "color": "#60a5fa" }, // label and color for y1
                "y2": { "label": "WebApp", "color": "#34d399" } // label and color for y2
            }
        
        Please follow this format strictly. Return only JSON enclosed in a markdown code block. Do not return additional text.
        
        Some Examples:
        \`\`\`json
        {
            "Chart": {
                "data": [
                    { "month": "September", "mobile": 1200, "webapp": 850 },
                    { "month": "October", "mobile": 1300, "webapp": 900 }
                ],
                "config": {
                    "mobile": { "label": "Mobile", "color": "#60a5fa" },
                    "webapp": { "label": "WebApp", "color": "#34d399" }
                }
            }
        }
        ---
        {
            "Chart": {
                "data": [
                    { "department": "HR", "satisfaction": 75, "motivation": 80, "engagement": 90 },
                    { "department": "Engineering", "satisfaction": 70, "motivation": 85, "engagement": 95 }
                ],
                "config": {
                    "satisfaction": { "label": "Satisfaction", "color": "#fbbf24" },
                    "motivation": { "label": "Motivation", "color": "#10b981" },
                    "engagement": { "label": "Engagement", "color": "#3b82f6"
                }
            }
        }
        ---
        {
            "Chart": {
                "data": [
                    { "time": "Morning", "heating": 300, "cooling": 200 },
                    { "time": "Afternoon", "heating": 350, "cooling": 250 }
                ],
                "config": {
                    "heating": { "label": "Heating", "color": "#fb7185" },
                    "cooling": { "label": "Cooling", "color": "#818cf8" }
                }
            }
        }
        \`\`\`

        Text to convert:
        ${messageContent}`,
        ChartSchema
    );
    console.log("Converted data:", data);
    return { toolName, data };
};


// Function to adapt the message content to a given schema
const adaptToSchema = async (text, schema) => {
    const structuredLlm = model.withStructuredOutput(schema);
    const result = await structuredLlm.invoke(text);
    return JSON.stringify(result);
};

// Create the graph and add nodes
const workflow = new StateGraph(GraphState)
    .addNode("decide_conversion", decideConversionNode)
    .addNode("convertToTable", convertToTable)
    .addNode("convertToChart", convertToChart)
    .addEdge(START, "decide_conversion")
    .addConditionalEdges("decide_conversion", (state) => state.toolName, {
        "display_basic": END,
        "display_table": "convertToTable",
        "display_chart": "convertToChart"
    })
    .addEdge("convertToTable", END)
    .addEdge("convertToChart", END);

const responseCachingWorkflow = new StateGraph(GraphState)
    .addNode("findResponse", findResponse)
    .addEdge(START, "findResponse")
    .addEdge("findResponse", END);

// Function to initialize and compile the LangGraph workflow
export async function initializeLangGraphWorkflow() {
    return workflow.compile({});
}

// Function to run the workflow and get the final state, now accepting a message history
export async function runLangGraphWorkflow(messageHistory) {
    console.log("Running LangGraph workflow with message history:", messageHistory);
    const compiledWorkflow = await initializeLangGraphWorkflow();

    // Pass the array of messages as the input state
    const finalState = await compiledWorkflow.invoke({
        messages: messageHistory.map(content => new HumanMessage(content)),
    });

    // Use the final state to determine the tool type and data
    // console.log("Final state:", finalState);

    return {
        toolName: finalState.toolName,
        data: finalState.data,
    };
}

export async function runResponseCachingWorkflow(text) {
    const compiledWorkflow = await responseCachingWorkflow.compile({});

    // Pass the array of messages as the input state
    const finalState = await compiledWorkflow.invoke({
        messages: [new HumanMessage(text)],
    });

    return {
        data: finalState.data,
        match: finalState.match,
    };
}