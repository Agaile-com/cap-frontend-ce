"use client"

import React from "react";
import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "../../ui/chart";
import { makeAssistantToolUI } from "@assistant-ui/react";

function adapter(str) {
    const str1 = `
    {
        "Chart": {
            "data": [
                { "month": "September", "mobile": 1200, "webapp": 850, "cloud": 500 },
                { "month": "October", "mobile": 1300, "webapp": 900, "cloud": 500 }
            ],
            "config": {
                "mobile": { "label": "Mobile", "color": "#60a5fa" },
                "webapp": { "label": "WebApp", "color": "#34d399" },
                "cloud": { "label": "Cloud", "color": "#34d399" }
            }
        }
    }`

    console.log("Received input:", str);

    try {
        // Extract the JSON part of the raw message
        const jsonStartIndex = str.indexOf("{");
        console.log("JSON start index:", jsonStartIndex);

        const jsonString = str.slice(jsonStartIndex);
        console.log("Extracted JSON string:", jsonString);

        // Parse the JSON string
        const parsedData = JSON.parse(jsonString);
        console.log("Parsed data:", parsedData);

        // Extract relevant fields for the chart
        const chartData = parsedData?.Chart.data || [];
        console.log("Chart data:", chartData);

        const configData = parsedData?.Chart.config || {};
        console.log("Config data:", configData);

        // Build chart configuration for data keys
        const chartConfig = Object.keys(configData).reduce((acc, key) => {
            acc[key] = {
                label: configData[key]?.label,
                color: configData[key]?.color,
            };
            console.log(`Processed config for key: ${key}`, acc[key]);
            return acc;
        }, {});

        console.log("Final chart configuration:", chartConfig);

        return { chartData, chartConfig, loading: 0 };
    } catch (error) {
        console.error("Error parsing chart data:", error);
        return { loading: 1 };
    }
}


export const useChartToolUI = makeAssistantToolUI({
    toolName: "display_chart",
    render: ({ args, status }) => {
        // Use the adapter to parse raw message data into chart structure
        const { chartData, chartConfig, loading } = adapter(args?.text);
        console.log("Chart Data:", chartData);
        console.log("Chart Config:", chartConfig);


        return (
            loading ? (
                <h1>Loading...</h1>
            ) : (
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        {Object.keys(chartConfig).map((key) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={chartConfig[key].color || "#60a5fa"}
                                radius={4}
                            />
                        ))}
                    </BarChart>
                </ChartContainer>
            )
        );
    },
});
