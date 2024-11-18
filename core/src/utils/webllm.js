import { CreateMLCEngine } from "@mlc-ai/web-llm";

// Callback function to update model loading progress
const initProgressCallback = (initProgress) => {
    console.log(initProgress);
}
const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";

const engine = await CreateMLCEngine(
    selectedModel,
    { initProgressCallback: initProgressCallback }, // engineConfig
);

const messages = [
    { role: "system", content: "You are a helpful AI assistant." },
    { role: "user", content: "Hello!" },
]

// Chunks is an AsyncGenerator object
const chunks = await engine.chat.completions.create({
    messages,
    temperature: 1,
    stream: true, // <-- Enable streaming
    stream_options: { include_usage: true },
});

let reply = "";
for await (const chunk of chunks) {
    reply += chunk.choices[0]?.delta.content || "";
    console.log(reply);
    if (chunk.usage) {
        console.log(chunk.usage); // only last chunk has usage
    }
}

const fullReply = await engine.getMessage();
console.log(fullReply);

