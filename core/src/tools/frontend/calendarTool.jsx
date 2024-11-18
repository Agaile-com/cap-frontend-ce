import React, { useState } from "react";
import { Calendar } from "../../ui/calendar"; // Import your Calendar component

import { makeAssistantToolUI } from "@assistant-ui/react";

function adapter(str) {
    try {
        // Extract the JSON part of the raw message
        const jsonStartIndex = str.indexOf("{");
        const jsonString = str.slice(jsonStartIndex);

        // Parse the JSON string
        const parsedData = JSON.parse(jsonString);

        // Extract the date from the response, if provided
        const calendarData = parsedData?.Calendar || {};
        const title = calendarData.title || "Calendar";
        const description = calendarData.description || "";
        const selectedDate = calendarData.selectedDate ? new Date(calendarData.selectedDate) : new Date();

        return { title, description, selectedDate, loading: 0 };
    } catch (error) {
        console.error("Error parsing calendar data:", error);
        return { loading: 1 };
    }
}

export const useCalendarToolUI = makeAssistantToolUI({
    toolName: "display_calendar",
    render: ({ args, status }) => {
        // Use the adapter to parse raw message data into calendar structure
        const { title, description, selectedDate, loading } = adapter(args?.text);

        return (
            loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="calendar-tool">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={() => (1)}
                        className="rounded-md border"
                    />
                </div>
            )
        );
    },
});
