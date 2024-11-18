import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card";

import { Button } from "../../ui/button";

import { makeAssistantToolUI } from "@assistant-ui/react";

function adapter(str) {
    try {
        // Extract the JSON part of the raw message
        const jsonStartIndex = str.indexOf("{");
        const jsonString = str.slice(jsonStartIndex);

        // Parse the JSON string
        const parsedData = JSON.parse(jsonString);

        // Extract relevant fields for the card
        const cardData = parsedData?.Card || {};
        const title = cardData.Header?.Title || "Default Title";
        const description = cardData?.Header?.Description || "Default Description";
        const content = cardData?.Content?.text || "Default Content";
        const ctaYes = cardData?.CTA?.true || "Yes";
        const ctaNo = cardData?.CTA?.false || "No";
        const loading = 0;

        return { title, description, content, ctaYes, ctaNo, loading };
    } catch (error) {
        console.error("Error parsing card data:", error);
        const loading = 1;
        return { loading };
    }
}

export const useCardToolUI = makeAssistantToolUI({
    toolName: "display_card",
    render: ({ args, status }) => {
        // Use the adapter to parse raw message data into card structure
        const { title, description, content, ctaYes, ctaNo, loading } = adapter(args?.text);

        return (loading ? <h1>Loading...</h1> : <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
            <CardFooter>
                <Button variant="primary">{ctaYes}</Button>
                <Button variant="outline">{ctaNo}</Button>
            </CardFooter>
        </Card>
        );
    },
});
