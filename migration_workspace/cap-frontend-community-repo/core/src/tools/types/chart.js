import { z } from "zod";

// Define a flexible chart schema
export const ChartSchema = z.object({
    Chart: z.object({
        data: z.array(
            z.record(z.any()) // allow any number of key-value pairs here
        ),
        config: z.record(
            z.object({
                label: z.string(),
                color: z.string().regex(/^#[0-9a-fA-F]{6}$/), // Validate as hex color
            })
        ),
    }),
});

// Example usage and testing
const data = {
    Chart: {
        data: [
            { label: "January", mobile: 1200, webapp: 800 },
            { label: "February", mobile: 1400, webapp: 950 },
            { label: "March", mobile: 1300, webapp: 900 },
        ],
        config: {
            mobile: { label: "Mobile", color: "#60a5fa" },
            webapp: { label: "WebApp", color: "#34d399" },
        },
    },
};

const result = ChartSchema.safeParse(data);
console.log(result.success ? "Data is valid" : "Data is invalid");
