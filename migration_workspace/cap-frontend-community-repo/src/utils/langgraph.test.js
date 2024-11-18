// import { expect, describe, it, test } from "vitest";
import { runLangGraphWorkflow } from "./langgraph.js";

const basicDataSamples = [
    [`The crisp morning air filled the quiet streets as sunlight began to seep through the mist, casting a golden hue over the waking town. Birds stirred in the trees, their songs gradually merging into a harmonious chorus that echoed along the cobblestone paths. A gentle breeze rustled the leaves, carrying with it the faint aroma of freshly baked bread from the local bakery. People slowly emerged from their homes, some clutching coffee cups while others hurried along with bundled-up children in tow. Amid the bustle, an elderly man sat quietly on a bench, watching with a faint smile as the town unfolded its daily routine, a familiar yet ever-changing tapestry of life.`],
    [`The sun dipped below the horizon, casting long shadows across the deserted beach. The waves lapped gently at the shore, their rhythmic ebb and flow a soothing backdrop to the fading light. Seagulls circled overhead, their cries mingling with the distant sound of a ship's horn. A lone figure walked along the waterline, leaving footprints in the wet sand that were quickly washed away by the tide. As darkness descended, the stars emerged one by one, painting the sky with their twinkling light. The night was calm and still, a tranquil respite from the chaos of the day.`],
    [`The city bustled with activity as people hurried along the crowded streets, their footsteps echoing off the tall buildings that loomed overhead. Cars honked, sirens wailed, and voices blended into a cacophony of sound that filled the air. Street vendors hawked their wares, while performers entertained passersby with music and dance. The scent of food wafted from open windows, mingling with the exhaust fumes and the tang of the nearby river. Amid the chaos, a young couple strolled hand in hand, oblivious to the hustle and bustle around them. The city pulsed with life, a vibrant tapestry of sights, sounds, and smells that wove together to create a rich and colorful mosaic.`]
];

const tabularDataSamples = [
    [`AGAILE offers several AI-powered product solutions:

    1. ConvertAI: An AI-powered solution to help convert website visitors into clients. It aims to improve conversion rates and customer acquisition. Learn more at https://agaile.ai/products/products-1/
    
    2. Zoho AI Assistant: This solution enhances customer service efficiency by leveraging AI capabilities. It helps provide faster and more accurate responses to customer inquiries. Learn more at https://agaile.ai/products/products-2/
    
    3. CAP-AI-PLATFORM: A scalable AI platform designed for enterprises. It allows businesses to integrate AI solutions into their existing workflows and processes. Learn more at https://agaile.ai/products/products-3/
    
    These products leverage AI technology to simplify complex processes, enhance customer engagement, and drive business growth. Please let me know if you need any additional details about our product offerings.`],

    [`Company | Product       | Category        | Price
    --------|---------------|----------------|-------
    AGAILE  | ConvertAI     | AI Conversion  | $99/month
    AGAILE  | Zoho AI       | Customer Support | $49/month
    AGAILE  | CAP-AI-PLATFORM | Enterprise AI | $299/month`],

    [`ID   | Name           | Age | Department
    -----|----------------|-----|-----------
    1001 | Alice Johnson  | 30  | Sales
    1002 | Bob Smith      | 45  | Engineering
    1003 | Carol White    | 28  | Marketing`],

    [`Product Code | Description                       | Stock Quantity | Price
    --------------|-----------------------------------|----------------|-------
    X100          | High-quality Bluetooth Speaker    | 150            | $49.99
    Y200          | Noise-Cancelling Headphones       | 75             | $199.99
    Z300          | Wireless Charging Pad             | 200            | $29.99`],

    [`Date       | Location    | Temperature | Condition
    -----------|-------------|-------------|-----------
    2024-01-01 | New York    | -3°C        | Snow
    2024-01-02 | Los Angeles | 15°C        | Sunny
    2024-01-03 | Chicago     | -5°C        | Cloudy`],

    [`Transaction ID | Customer      | Amount   | Status
    ----------------|---------------|----------|---------
    TXN1001         | John Doe      | $200.00  | Completed
    TXN1002         | Jane Smith    | $350.00  | Pending
    TXN1003         | Bob Johnson   | $120.00  | Failed`]
];

const barChartDataSamples = [
    [`Give me the sales data in a chart format`, `Sales data for Q1 2024:
    - January: Mobile 1200, WebApp 800
    - February: Mobile 1400, WebApp 950
    - March: Mobile 1300, WebApp 900`],

    [`Monthly revenue in 2023:
    - January: $10,000
    - February: $12,500
    - March: $15,000
    - April: $13,500`],

    [`Website traffic sources over Q1 2024:
    - Direct: 2000 visits
    - Organic Search: 1500 visits
    - Social Media: 1000 visits`],

    [`Employee count by department:
    - Sales: 25 employees
    - Engineering: 40 employees
    - Marketing: 15 employees`],

    [`Product sales by region for July 2024:
    - North America: 500 units
    - Europe: 450 units
    - Asia: 600 units`]
];

(async () => {
    // Test a single bar chart data item as an array of messages
    const toolResult = await runLangGraphWorkflow(barChartDataSamples[0]);
    console.log("Tool type determined by workflow:", toolResult.toolName);
})();

// describe("Individual Non-Tabular Data Items", () => {
//     basicDataSamples.forEach((item, index) => {
//         it(`should determine toolName as "display_basic" for non-tabular item ${index + 1}`, async () => {
//             const result = await runLangGraphWorkflow(item);
//             console.log("Tool type determined by workflow for non-tabular item:", result.toolName);
//             expect(result).toHaveProperty("toolName", "display_basic");
//         });
//     });
// });

// describe("Individual Tabular Data Items", () => {
//     tabularDataSamples.forEach((item, index) => {
//         it(`should determine toolName as "display_table" for tabular item ${index + 1}`, async () => {
//             const result = await runLangGraphWorkflow(item);
//             console.log("Tool type determined by workflow for tabular item:", result.toolName);
//             expect(result).toHaveProperty("toolName", "display_table");
//         });
//     });
// });

// describe("Individual Bar Chart Data Items", () => {
//     barChartDataSamples.forEach((item, index) => {
//         it(`should determine toolName as "display_chart" for bar chart item ${index + 1}`, async () => {
//             const result = await runLangGraphWorkflow(item);
//             console.log("Tool type determined by workflow for bar chart item:", result.toolName);
//             expect(result).toHaveProperty("toolName", "display_chart");
//         });
//     });
// }
// )();
