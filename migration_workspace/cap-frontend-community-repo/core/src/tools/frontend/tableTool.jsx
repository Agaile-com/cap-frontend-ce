import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from "../../ui/table";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { formatMessage } from "../../utils";

function adapter(str) {
    console.log("TableTool Adapter received:", str);
    try {
        // Extract the JSON part of the raw message
        const jsonStartIndex = str.indexOf("{");
        const jsonString = str.slice(jsonStartIndex);

        // Parse the JSON string
        const parsedData = JSON.parse(jsonString);
        console.log("Parsed data:", parsedData);

        // Extract relevant fields for the table
        const preText = parsedData?.preText || "";
        const postText = parsedData?.postText || "";
        const tableData = parsedData?.Table || {};
        const caption = tableData.TableCaption || "Default Caption";
        const headers = tableData.TableHeader || [];
        const rows = tableData.TableBody || [];

        return { preText, postText, caption, headers, rows, loading: 0 };
    } catch (error) {
        console.error("Error parsing table data:", error);
        return { loading: 1 };
    }
}

export const useTableToolUI = makeAssistantToolUI({
    toolName: "display_table",
    render: ({ args, status }) => {
        // Use the adapter to parse raw message data into table structure
        const { preText, postText, caption, headers, rows, loading } = adapter(args?.text);

        // const formattedPreText = formatMessage(preText).formattedMessage;
        // const formattedPostText = formatMessage(postText).formattedMessage;

        return (
            loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <p>{preText}</p><br />
                    <Table>
                        <TableCaption>{caption}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                {headers.map((header, index) => (
                                    <TableHead key={index} className={header.className}>
                                        {header.TableHead}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {row.TableRow.map((cell, cellIndex) => {

                                        const { formattedMessage } = formatMessage(cell.TableCell);

                                        return <TableCell key={cellIndex} className={cell.className}>

                                            <div dangerouslySetInnerHTML={{ __html: formattedMessage ?? formattedMessage }} />
                                            {/* {formatMessage(cell.TableCell)} */}
                                        </TableCell>
                                    }
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table><br />
                    <p>{postText}</p>
                </div>
            )
        );
    },
});
