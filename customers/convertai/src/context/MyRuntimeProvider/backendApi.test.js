async function backendApi({ messages, abortSignal, config }) {
    const latestMessage = extractLatestMessage(messages);

    const requestBody = {
        chatID: generateChatID(),
        userID: generateUserID(),
        modelID: "CLAUDE.V3.OPUS",
        assistant: config.assistantMode || "default",
        message_content: latestMessage,
        streaming: true,
        show_links: true,
    };

    // Perform fetch request with streaming enabled
    const response = await fetch(`http://localhost:5000/api/chat_answer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": `ecc9b2b25444104fdcda5678f82267e8533bb462`,  // Use API key from config
        },
        body: JSON.stringify(requestBody),
        signal: abortSignal,
    });

    if (!response.body) throw new Error("No response body for streaming");
    return response.body.getReader();
}

// Mock implementations of helper functions if they are not provided
function extractLatestMessage(messages) {
    return messages[messages.length - 1]?.content || "";
}

function generateChatID() {
    return "testChatID";
}

function generateUserID() {
    return "testUserID";
}

// Mock config and data for testing
const config = {
    assistantMode: "default",
    apiKey: "test-api-key",  // Replace with actual key if available
};

const messages = [
    { content: "Show me some updates from project leads please." }
];

// Test function to simulate calling backendApi
async function testBackendApi() {
    try {
        // Start streaming the response
        const stream = await backendApi({ messages, abortSignal: null, config });

        let text = "";
        const decoder = new TextDecoder();

        // Process each part of the stream
        while (true) {
            const { done, value } = await stream.read();
            if (done) break;

            try {
                const chunk = decoder.decode(value, { stream: true });
                const data = chunk;
                text += data;
                // console.log("Partial content:", text);
            } catch (error) {
                console.error("Error during processing:", error);
            }
        }

        // Log the final accumulated content
        console.log("Final content:", text);

    } catch (error) {
        console.error("Error during streaming:", error);
    }
}

// Run the test
testBackendApi();
