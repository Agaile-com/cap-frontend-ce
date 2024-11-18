"use client";
import { React, useEffect } from "react";
import {
    AssistantRuntimeProvider,
    useLocalRuntime,
} from "@assistant-ui/react";
import { handleLinks, removeTrailingLinks } from "../../utils";
import { runLangGraphWorkflow, runResponseCachingWorkflow } from "../../utils/langgraph";

const prodFunctionUrl = process.env.REACT_APP_BACKEND_URL + '/chat_answer';
const mockFunctionUrl = process.env.REACT_APP_MOCK_BACKEND_URL + '/chat_answer';
const X_API_KEY = process.env.REACT_APP_X_API_KEY;
const ASSISTANT_MODE = process.env.REACT_APP_ASSISTANT_MODE;
const cachedResponses = require('../../utils/responses.json');

const { v4: uuidv4 } = require('uuid');

// Utility function to generate unique IDs
function generateChatID() {
    return `chat_${uuidv4()}_${Date.now()}`;
}

function generateUserID() {
    return `user_${uuidv4()}_${Date.now()}`;
}

// Tool configuration to map "ui" types to corresponding tool names
const toolConfig = {
    "card": "display_card",
    "table": "display_table",
    "chart": "display_chart",
    "calendar": "display_calendar",
    "default": "display_basic"
};

// Extract the latest message from the chat
function extractLatestMessage(messages) {
    return messages[messages.length - 1].content[0].text;
}

// Remove metadata and keep only the main message content
function extractAnswer(responseText) {
    const parts = responseText.split('---');
    return parts.length > 2 ? parts[2].trim() : responseText.trim();
}

export async function backendApi({ messages, abortSignal, config }) {
    const latestMessage = extractLatestMessage(messages);

    // TODO: REPLACE THIS IMPLEMENTATION AND USE THE NEW LANGGRAPH WORKFLOW HERE TO DETERMINE THE MESSAGE TEXT (WITHSTRUCTURED OUTPUT)
    // Select URL based on the presence of "/mock" in the latest message
    const functionUrl = latestMessage.includes("/mock") ? config.mockFunctionUrl : config.prodFunctionUrl;

    // const functionUrl = config.mockFunctionUrl;

    // TODO: IMPLEMENT RESPONSE CACHING
    let cachedResponse = await runResponseCachingWorkflow(latestMessage, cachedResponses);
    console.log("Cached response: ", cachedResponse);
    if (cachedResponse.match == true) {
        console.log("Using cached response for:", latestMessage);
        let stream = new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode(cachedResponse.data.trim()));
                controller.close();
            },
        });
        return stream.getReader();
    }

    const requestBody = {
        chatID: generateChatID(),
        userID: generateUserID(),
        modelID: "CLAUDE.V3.OPUS",
        assistant: config.assistantMode || "default",
        message_content: latestMessage,
        streaming: true,
        show_links: true,
    };

    const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": config.apiKey,
        },
        body: JSON.stringify(requestBody),
        signal: abortSignal,
    });

    if (!response.body) throw new Error("No response body for streaming");
    return response.body.getReader();
}

const MyModelAdapter = {
    async *run({ messages, abortSignal }) {
        const config = {
            prodFunctionUrl,
            mockFunctionUrl,
            apiKey: X_API_KEY,
            assistantMode: ASSISTANT_MODE,
        };
        const stream = await backendApi({ messages, abortSignal, config });

        let text = "";
        const decoder = new TextDecoder();
        let toolName = toolConfig.default; // Default tool name

        while (true) {
            const { done, value } = await stream.read();
            if (done) break;

            let chunk = decoder.decode(value, { stream: true });

            // TODO: REPLACE THIS IMPLEMENTATION AND USE THE NEW LANGGRAPH WORKFLOW HERE TO DETERMINE THE TOOL NAME AND TEXT (WITHSTRUCTURED OUTPUT)
            // Detect the "ui: <type>" in the chunk and set toolName based on toolConfig
            const uiTypeMatch = chunk.match(/ui:\s*(\w+)/);
            if (uiTypeMatch) {
                const uiType = uiTypeMatch[1];
                toolName = toolConfig[uiType] || toolConfig.default;
            }

            text += chunk;

            // Yield partial content with the appropriate toolName
            yield {
                content: [
                    {
                        type: "tool-call",
                        toolName: toolName,
                        args: {
                            text: text,
                        }
                    }
                ],
            };
        }

        // TODO: UNCOMMENT THIS TO USE THE SMART INFOGRAPHIC MECHANISM
        // return;

        // Process the final chunk with LangGraph workflow
        let infographic = await runLangGraphWorkflow([
            messages[messages.length - 1].content[0].text,
            text
        ]);

        // Yield the final structured output from LangGraph
        yield {
            content: [
                {
                    type: "tool-call",
                    toolName: infographic.toolName,  // Adjust tool type based on LangGraph output
                    args: {
                        // Use the original text if the tool is "display_basic"
                        text: (infographic.toolName == "display_basic") ? text : infographic.data,
                    }
                }
            ],
        };
    },
};

export function MyRuntimeProvider({ children }) {
    const runtime = useLocalRuntime(MyModelAdapter);

    useEffect(() => {
        // Optional: you can log runtime states or effects here if needed
    }, [runtime]);

    return (
        <AssistantRuntimeProvider runtime={runtime}>
            {children}
        </AssistantRuntimeProvider>
    );
}
