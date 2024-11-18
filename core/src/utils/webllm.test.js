const puppeteer = require("puppeteer");

async function runWebLLMInBrowser() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Listen for console messages from the browser context
    page.on("console", (msg) => console.log("BROWSER LOG:", msg.text()));

    // Define the WebLLM script to run in the browser context
    const script = `
        (async () => {
            try {
                const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

                const initProgressCallback = (initProgress) => {
                    console.log("Progress:", initProgress);
                };
                const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";

                const engine = await CreateMLCEngine(
                    selectedModel,
                    { initProgressCallback: initProgressCallback }
                );

                const messages = [
                    { role: "system", content: "You are a helpful AI assistant." },
                    { role: "user", content: "Hello!" },
                ];

                const chunks = await engine.chat.completions.create({
                    messages,
                    temperature: 1,
                    stream: true,
                    stream_options: { include_usage: true },
                });

                let reply = "";
                for await (const chunk of chunks) {
                    reply += chunk.choices[0]?.delta.content || "";
                    console.log("Reply so far:", reply);
                    if (chunk.usage) {
                        console.log("Usage:", chunk.usage);
                    }
                }

                const fullReply = await engine.getMessage();
                console.log("Full Reply:", fullReply);

                // Notify Node.js that the LLM processing is complete
                return "completed";
            } catch (error) {
                console.error("Error running WebLLM:", error);
                return "error";
            }
        })();
    `;

    // Run the script in the browser context and wait for it to complete
    const result = await page.evaluate(script);

    if (result === "completed") {
        console.log("LLM processing completed successfully.");
    } else {
        console.log("LLM processing encountered an error.");
    }

    // Close the browser after completion
    // await browser.close();
}

runWebLLMInBrowser();
