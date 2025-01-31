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
            messages: params.messages
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/chatApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$langgraph$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react-langgraph/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$markdown$2f$dist$2f$ui$2f$markdown$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react-markdown/dist/ui/markdown-text.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$assistant$2d$modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AssistantModal$3e$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react/dist/ui/assistant-modal.mjs [app-client] (ecmascript) <export default as AssistantModal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$thread$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Thread$3e$__ = __turbopack_import__("[project]/node_modules/@assistant-ui/react/dist/ui/thread.mjs [app-client] (ecmascript) <export default as Thread>");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const MarkdownText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$markdown$2f$dist$2f$ui$2f$markdown$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeMarkdownText"])();
function MyAssistantModal() {
    _s();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2f$dist$2f$ui$2f$assistant$2d$modal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AssistantModal$3e$__["AssistantModal"], {
        runtime: runtime,
        assistantMessage: {
            components: {
                Text: MarkdownText
            }
        }
    }, void 0, false, {
        fileName: "[project]/components/MyAssistant.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(MyAssistantModal, "mUbiv3T7m0SCPAFklcIHEmck1VU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$langgraph$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLangGraphRuntime"]
    ];
});
_c = MyAssistantModal;
function MyAssistant() {
    _s1();
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
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s1(MyAssistant, "mUbiv3T7m0SCPAFklcIHEmck1VU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$assistant$2d$ui$2f$react$2d$langgraph$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLangGraphRuntime"]
    ];
});
_c1 = MyAssistant;
var _c, _c1;
__turbopack_refresh__.register(_c, "MyAssistantModal");
__turbopack_refresh__.register(_c1, "MyAssistant");
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