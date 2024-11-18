import { makeAssistantToolUI } from "@assistant-ui/react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown"; // Install with: npm install react-markdown
import remarkGfm from "remark-gfm"; // For GitHub-flavored Markdown (optional)
import rehypeRaw from "rehype-raw"; // Allows rendering raw HTML in Markdown

import { deduplicateLinks } from "../../utils";

export const BasicTool = makeAssistantToolUI({
    toolName: "display_basic",
    render: ({ args, status }) => {
        return <p>({args?.text})</p>;
    },
});

const formatMessage = (message, excludeLinks = []) => {
    const linkPattern = /(https?:\/\/[^\s]+)/g;

    // Filter out the initial metadata from the message
    const contentStart = message.indexOf('---', message.indexOf('---') + 3);
    let filteredMessage = contentStart >= 0 ? message.slice(contentStart + 3).trim() : message;

    const links = filteredMessage.match(linkPattern);
    const uniqueLinks = links ? deduplicateLinks(links) : [];
    let formattedMessage = filteredMessage;

    // Replace URLs with clickable links
    if (uniqueLinks.length > 0) {
        uniqueLinks.forEach(url => {
            if (!excludeLinks.includes(url)) {
                formattedMessage = formattedMessage.replace(url, `<a style="color: black; text-decoration: underline;" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
            }
        });
    }

    // Replace newline characters with <br/>
    if (formattedMessage.includes('\n')) {
        formattedMessage = formattedMessage.replace(/\n/g, '<br/>');
    }

    // console.log(formattedMessage);

    return { formattedMessage, uniqueLinks };
};


/**
 * Basic tool UI component. Renders HTML
 */
export const useBasicToolUI = makeAssistantToolUI({
    toolName: "display_basic",
    render: ({ args, status }) => {

        // console.log(args?.text);
        const { formattedMessage, uniqueLinks } = formatMessage(args?.text);
        // console.log(formattedMessage);

        return <>
            {/* <p>{(args?.text)}</p> */}
            <div dangerouslySetInnerHTML={{ __html: formattedMessage ?? formattedMessage }} />
        </>;
    },
});


export const useBasicToolUIMarkdown = makeAssistantToolUI({
    toolName: "display_basic",
    render: ({ args, status }) => {
        const rawMessage = args?.text;
        const { formattedMessage } = formatMessage(args?.text);

        console.log("Formatted Message:", formattedMessage);

        return (
            <div>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        table: ({ node, ...props }) => (
                            <table
                                style={{
                                    borderSpacing: "0",
                                    borderCollapse: "collapse",
                                    borderColor: "inherit",
                                    display: "block",
                                    width: "max-content",
                                    maxWidth: "100%",
                                    overflow: "auto",
                                    border: "1px solid #555", // Table border style
                                }}
                                {...props}
                            />
                        ),
                        tr: ({ node, ...props }) => (
                            <tr
                                style={{
                                    borderColor: "inherit",
                                    borderStyle: "solid",
                                    borderWidth: "2px",
                                }}
                                {...props}
                            />
                        ),
                        td: ({ node, ...props }) => (
                            <td
                                style={{
                                    borderColor: "inherit",
                                    borderStyle: "solid",
                                    borderWidth: "2px",
                                    padding: "8px", // Adds spacing for readability
                                }}
                                {...props}
                            />
                        ),
                        th: ({ node, ...props }) => (
                            <th
                                style={{
                                    borderColor: "inherit",
                                    borderStyle: "solid",
                                    borderWidth: "2px",
                                    padding: "8px", // Adds spacing for header cells
                                    backgroundColor: "#f5f5f5", // Header background color
                                }}
                                {...props}
                            />
                        ),
                        tbody: ({ node, ...props }) => (
                            <tbody
                                style={{
                                    borderColor: "inherit",
                                    borderStyle: "solid",
                                    borderWidth: "2px",
                                }}
                                {...props}
                            />
                        ),
                        thead: ({ node, ...props }) => (
                            <thead
                                style={{
                                    borderColor: "inherit",
                                    borderStyle: "solid",
                                    borderWidth: "2px",
                                }}
                                {...props}
                            />
                        ),
                        tfoot: ({ node, ...props }) => (
                            <tfoot
                                style={{
                                    borderColor: "inherit",
                                    borderStyle: "solid",
                                    borderWidth: "2px",
                                }}
                                {...props}
                            />
                        ),
                        blockquote: ({ node, ...props }) => (
                            <blockquote
                                style={{
                                    padding: "0 1em",
                                    color: "#6a737d",
                                    borderLeft: "0.25em solid #dfe2e5",
                                    margin: "16px 0", // Optional: Adds spacing around blockquotes
                                }}
                                {...props}
                            />
                        ),
                    }}
                >
                    {rawMessage ?? ""}
                </ReactMarkdown>
            </div>
        );
    },
});
