(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_da3ad0._.js", {

"[project]/lib/chatApi.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createThread": (()=>createThread),
    "getThreadState": (()=>getThreadState),
    "sendMessage": (()=>sendMessage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/dist/client.js [app-client] (ecmascript)");
;
const createClient = ()=>{
    const apiUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env["NEXT_PUBLIC_LANGGRAPH_API_URL"] || new URL("/api", window.location.href).href;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Client"]({
        apiUrl
    });
};
const createThread = async ()=>{
    const client = createClient();
    return client.threads.create();
};
const getThreadState = async (threadId)=>{
    const client = createClient();
    return client.threads.getState(threadId);
};
const sendMessage = async (params)=>{
    const client = createClient();
    return client.runs.stream(params.threadId, ("TURBOPACK compile-time value", "fefda989-9c0e-4ddd-94d8-d1b5540b17bc"), {
        input: {
            messages: params.messages.slice(-1)
        },
        streamMode: "messages"
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/MyAssistant.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MyAssistant": (()=>MyAssistant),
    "MyAssistantModal": (()=>MyAssistantModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/chatApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$langgraph$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react-langgraph/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$markdown$2f$dist$2f$ui$2f$markdown$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react-markdown/dist/ui/markdown-text.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thread$3e$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react/dist/ui/thread.mjs [app-client] (ecmascript) <export default as Thread>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2d$welcome$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThreadWelcome$3e$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react/dist/ui/thread-welcome.mjs [app-client] (ecmascript) <export default as ThreadWelcome>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$composer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Composer$3e$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react/dist/ui/composer.mjs [app-client] (ecmascript) <export default as Composer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$assistant$2d$modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AssistantModal$3e$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react/dist/ui/assistant-modal.mjs [app-client] (ecmascript) <export default as AssistantModal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$primitives$2f$assistantModal$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__AssistantModalPrimitive$3e$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react/dist/primitives/assistantModal/index.mjs [app-client] (ecmascript) <export * as AssistantModalPrimitive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature(), _s2 = __turbopack_refresh__.signature(), _s3 = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
const MarkdownText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$markdown$2f$dist$2f$ui$2f$markdown$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeMarkdownText"])({
    components: {
        // Make links open in a new tab instead of default behavior
        a: ({ node, className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                target: "_blank",
                rel: "noopener noreferrer",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("aui-md-a", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/MyAssistant.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this)
    }
});
const AgaileLogo = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: "https://agaile.ai",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "text-muted-foreground flex w-full items-center justify-center gap-2 border-t py-2 text-xs",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                padding: "0px",
                margin: "0px"
            },
            children: [
                "Built by",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                    style: {
                        padding: "0px",
                        margin: "0px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            padding: "0px",
                            margin: "0px"
                        },
                        children: [
                            "AG",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    padding: "0px",
                                    margin: "0px",
                                    color: "#6A5BCD"
                                },
                                children: "AI"
                            }, void 0, false, {
                                fileName: "[project]/components/MyAssistant.tsx",
                                lineNumber: 36,
                                columnNumber: 9
                            }, this),
                            "LE"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MyAssistant.tsx",
                        lineNumber: 34,
                        columnNumber: 7
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/MyAssistant.tsx",
                    lineNumber: 33,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/MyAssistant.tsx",
            lineNumber: 31,
            columnNumber: 3
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/MyAssistant.tsx",
        lineNumber: 25,
        columnNumber: 26
    }, this);
_c = AgaileLogo;
const MyThread = ()=>{
    // Refer to the following docs for more information on custom structure:
    // https://www.assistant-ui.com/docs/ui/styled/Decomposition
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thread$3e$__["Thread"].Root, {
        className: "flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thread$3e$__["Thread"].Viewport, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2d$welcome$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThreadWelcome$3e$__["ThreadWelcome"], {}, void 0, false, {
                        fileName: "[project]/components/MyAssistant.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thread$3e$__["Thread"].Messages, {}, void 0, false, {
                        fileName: "[project]/components/MyAssistant.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thread$3e$__["Thread"].FollowupSuggestions, {}, void 0, false, {
                        fileName: "[project]/components/MyAssistant.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thread$3e$__["Thread"].ViewportFooter, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thread$3e$__["Thread"].ScrollToBottom, {}, void 0, false, {
                                fileName: "[project]/components/MyAssistant.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$composer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Composer$3e$__["Composer"], {}, void 0, false, {
                                fileName: "[project]/components/MyAssistant.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MyAssistant.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MyAssistant.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AgaileLogo, {}, void 0, false, {
                fileName: "[project]/components/MyAssistant.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MyAssistant.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
};
_c1 = MyThread;
const MyAssistantModalTrigger = ()=>{
    _s();
    var _s1 = __turbopack_refresh__.signature();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    function Bot(props) {
        _s1();
        const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ...props,
            children: [
                "  ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: hovered ? '/bot_highlighted.png' : '/bot.png',
                    alt: "Bot example",
                    style: {
                        width: '150px',
                        animation: 'bob 2s infinite',
                        transition: 'all 0.2s ease'
                    },
                    onMouseEnter: ()=>setHovered(true),
                    onMouseLeave: ()=>setHovered(false)
                }, void 0, false, {
                    fileName: "[project]/components/MyAssistant.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `
            @keyframes bob {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
          `
                }, void 0, false, {
                    fileName: "[project]/components/MyAssistant.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/MyAssistant.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this);
    }
    _s1(Bot, "V8YbV+gTZxGliGj1g0fftBlvsq4=");
    function BotButton({ setIsOpen, className }) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>{
                setIsOpen(true);
                window.parent.postMessage('chat-open', '*');
            },
            className: className,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bot, {
                "data-state": true,
                className: "aui-modal-button-closed-icon"
            }, void 0, false, {
                fileName: "[project]/components/MyAssistant.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/MyAssistant.tsx",
            lineNumber: 111,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$assistant$2d$modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AssistantModal$3e$__["AssistantModal"].Anchor, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$primitives$2f$assistantModal$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__AssistantModalPrimitive$3e$__["AssistantModalPrimitive"].Trigger, {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        right: "0px",
                        bottom: "0px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `transition-transform transform ${isOpen ? "translate-y-0 scale-100" : "translate-y-2 scale-85"} duration-300`,
                        children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setIsOpen(false);
                                // Send message to parent window to close the chat
                                window.parent.postMessage('chat-close', '*');
                            },
                            className: "bg-black text-white rounded-full p-3 flex items-center justify-center transition-transform duration-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                                className: "h-6 w-6"
                            }, void 0, false, {
                                fileName: "[project]/components/MyAssistant.tsx",
                                lineNumber: 140,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/MyAssistant.tsx",
                            lineNumber: 132,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BotButton, {
                            setIsOpen: setIsOpen,
                            className: "transition-transform duration-300"
                        }, void 0, false, {
                            fileName: "[project]/components/MyAssistant.tsx",
                            lineNumber: 143,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MyAssistant.tsx",
                        lineNumber: 127,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/MyAssistant.tsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MyAssistant.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/MyAssistant.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/MyAssistant.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
};
_s(MyAssistantModalTrigger, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c2 = MyAssistantModalTrigger;
const Modal = (config)=>{
    _s1();
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$assistant$2d$modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AssistantModal$3e$__["AssistantModal"].Root, {
        config: config,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MyAssistantModalTrigger, {}, void 0, false, {
                fileName: "[project]/components/MyAssistant.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$assistant$2d$modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AssistantModal$3e$__["AssistantModal"].Content, {
                className: `transition-all duration-300 ${isExpanded ? "w-[600px] h-[800px] p-6" : "w-[400px] h-[500px] p-3"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsExpanded(!isExpanded),
                        className: "absolute top-2 left-2 bg-gray-300 rounded-full p-1 hover:bg-gray-400 transition-colors",
                        title: isExpanded ? "Shrink" : "Expand",
                        children: isExpanded ? "➖" : "➕"
                    }, void 0, false, {
                        fileName: "[project]/components/MyAssistant.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MyThread, {}, void 0, false, {
                        fileName: "[project]/components/MyAssistant.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MyAssistant.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MyAssistant.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
};
_s1(Modal, "FPNvbbHVlWWR4LKxxNntSxiIS38=");
_c3 = Modal;
const MyAssistantModal = ()=>{
    _s2();
    const threadIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const runtime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$langgraph$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLangGraphRuntime"])({
        threadId: threadIdRef.current,
        stream: {
            "MyAssistantModal.useLangGraphRuntime[runtime]": async (messages)=>{
                if (!threadIdRef.current) {
                    const { thread_id } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createThread"])();
                    threadIdRef.current = thread_id;
                }
                const threadId = threadIdRef.current;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendMessage"])({
                    threadId,
                    messages
                });
            }
        }["MyAssistantModal.useLangGraphRuntime[runtime]"],
        onSwitchToNewThread: {
            "MyAssistantModal.useLangGraphRuntime[runtime]": async ()=>{
                const { thread_id } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createThread"])();
                threadIdRef.current = thread_id;
            }
        }["MyAssistantModal.useLangGraphRuntime[runtime]"],
        onSwitchToThread: {
            "MyAssistantModal.useLangGraphRuntime[runtime]": async (threadId)=>{
                const state = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThreadState"])(threadId);
                threadIdRef.current = threadId;
                return {
                    messages: state.values.messages
                };
            }
        }["MyAssistantModal.useLangGraphRuntime[runtime]"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Modal, {
        assistantAvatar: {
            src: "/usr.png",
            alt: "AI Assistant",
            fallback: "AI"
        },
        runtime: runtime
    }, void 0, false, {
        fileName: "[project]/components/MyAssistant.tsx",
        lineNumber: 208,
        columnNumber: 5
    }, this);
};
_s2(MyAssistantModal, "mUbiv3T7m0SCPAFklcIHEmck1VU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$langgraph$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLangGraphRuntime"]
    ];
});
_c4 = MyAssistantModal;
function MyAssistant() {
    _s3();
    const threadIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const runtime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$langgraph$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLangGraphRuntime"])({
        threadId: threadIdRef.current,
        stream: {
            "MyAssistant.useLangGraphRuntime[runtime]": async (messages)=>{
                if (!threadIdRef.current) {
                    const { thread_id } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createThread"])();
                    threadIdRef.current = thread_id;
                }
                const threadId = threadIdRef.current;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendMessage"])({
                    threadId,
                    messages
                });
            }
        }["MyAssistant.useLangGraphRuntime[runtime]"],
        onSwitchToNewThread: {
            "MyAssistant.useLangGraphRuntime[runtime]": async ()=>{
                const { thread_id } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createThread"])();
                threadIdRef.current = thread_id;
            }
        }["MyAssistant.useLangGraphRuntime[runtime]"],
        onSwitchToThread: {
            "MyAssistant.useLangGraphRuntime[runtime]": async (threadId)=>{
                const state = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThreadState"])(threadId);
                threadIdRef.current = threadId;
                return {
                    messages: state.values.messages
                };
            }
        }["MyAssistant.useLangGraphRuntime[runtime]"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thread$3e$__["Thread"], {
        runtime: runtime,
        assistantMessage: {
            components: {
                Text: MarkdownText
            }
        }
    }, void 0, false, {
        fileName: "[project]/components/MyAssistant.tsx",
        lineNumber: 246,
        columnNumber: 5
    }, this);
}
_s3(MyAssistant, "mUbiv3T7m0SCPAFklcIHEmck1VU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$langgraph$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLangGraphRuntime"]
    ];
});
_c5 = MyAssistant;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_refresh__.register(_c, "AgaileLogo");
__turbopack_refresh__.register(_c1, "MyThread");
__turbopack_refresh__.register(_c2, "MyAssistantModalTrigger");
__turbopack_refresh__.register(_c3, "Modal");
__turbopack_refresh__.register(_c4, "MyAssistantModal");
__turbopack_refresh__.register(_c5, "MyAssistant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_da3ad0._.js.map