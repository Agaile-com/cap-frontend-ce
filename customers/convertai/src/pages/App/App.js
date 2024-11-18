import {
  ThreadPrimitive,
  ComposerPrimitive,
  useThread,
  useThreadConfig,
  UserMessage,
  EditComposer,
  AssistantMessage,
  useAssistantToolUI,
  useInlineRender,
  useMessage
} from "@assistant-ui/react";

import { BasicTool, useBasicToolUI } from "../../tools/frontend/basic";

import { ArrowDownIcon, SendHorizontalIcon, StopCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
// import './App.css';

import { Tooltip, IconButton } from '@mui/material';

import { useCardToolUI } from "../../tools/frontend/cardTool";
import { useTableToolUI } from "../../tools/frontend/tableTool";
import { useCalendarToolUI } from "../../tools/frontend/calendarTool";
import { useChartToolUI } from "../../tools/frontend/chartTool";

const TooltipIconButton = ({ tooltip, variant, className, children, onClick }) => {
  return (
    <Tooltip title={tooltip} arrow>
      <IconButton
        onClick={onClick}
        className={className}
        // color={variant === "outline" ? "default" : "primary"}
        color="black"
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

const MyAssistantMessage = () => {

  const [args, setArgs] = useState({});
  const message = useMessage(t => t);
  useBasicToolUI();
  useCardToolUI();
  useTableToolUI();
  useCalendarToolUI();
  useChartToolUI();

  useEffect(() => {
    setArgs(message?.content[0]?.args);
    // console.log("Message", message);
    // console.log("Args", args);
  }, [message, args]);

  return (
    <>
      <AssistantMessage
        message={args?.text}
        className="aui-thread-message"
      />
    </>
  );
}

const App = () => {
  const suggestions = useThread((t) => t.suggestions);
  // TODO: REMOVE HARDCODED SUGGESTIONS
  // const suggestions = [
  //   { prompt: "What AI tools does AGAILE INC offer?" },
  //   { prompt: "How does AGAILE INC help businesses scale?" },
  //   { prompt: "Who are your clients?" }
  // ];


  return (
    <ThreadPrimitive.Root className="aui-root aui-thread-root">
      <ThreadPrimitive.Viewport className="aui-thread-viewport">
        <h1 style={{ textAlign: "center", color: "#6a5acd", fontSize: "2em", marginBottom: "20px" }}>
          Convert AI
        </h1>
        <ThreadPrimitive.Empty>
          <div className="aui-thread-welcome-root">
            <div className="aui-thread-welcome-center">
              <p className="aui-thread-welcome-message">How can I help you today?</p>
            </div>
            <div className="aui-thread-welcome-suggestion-container">
              {suggestions.map((suggestion, idx) => (
                <ThreadPrimitive.Suggestion
                  key={`${suggestion.prompt}-${idx}`}
                  className="aui-thread-welcome-suggestion"
                  prompt={suggestion.prompt}
                  method="replace"
                  autoSend
                >
                  <span className="aui-thread-welcome-suggestion-text">
                    {suggestion.text ?? suggestion.prompt}
                  </span>
                </ThreadPrimitive.Suggestion>
              ))}
            </div>
          </div>
        </ThreadPrimitive.Empty>

        <ThreadPrimitive.Messages
          components={{
            UserMessage: UserMessage,
            EditComposer: EditComposer,
            AssistantMessage: MyAssistantMessage
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div style={{ flexGrow: 1 }} />
        </ThreadPrimitive.If>

        <div className="aui-thread-followup-suggestions">
          <ThreadPrimitive.If empty={false} running={false}>
            {suggestions?.map((suggestion, idx) => (
              <ThreadPrimitive.Suggestion
                key={idx}
                className="aui-thread-followup-suggestion"
                prompt={suggestion.prompt}
                method="replace"
                autoSend
              >
                {suggestion.prompt}
              </ThreadPrimitive.Suggestion>
            ))}
          </ThreadPrimitive.If>
        </div>

        <div className="aui-thread-viewport-footer">
          <ThreadPrimitive.ScrollToBottom asChild>
            <TooltipIconButton
              tooltip="Scroll to bottom"
              variant="outline"
              className="aui-thread-scroll-to-bottom"
            >
              <ArrowDownIcon />
            </TooltipIconButton>
          </ThreadPrimitive.ScrollToBottom>
          <ComposerPrimitive.Root className="aui-composer-root">
            <ComposerPrimitive.Input
              placeholder="Write a message..."
              className="aui-composer-input"
            />
            <ThreadPrimitive.If running={false}>
              <ComposerPrimitive.Send asChild>
                <TooltipIconButton
                  tooltip="Send"
                  variant="primary"
                  className="aui-composer-send"
                >
                  <SendHorizontalIcon />
                </TooltipIconButton>
              </ComposerPrimitive.Send>
            </ThreadPrimitive.If>
            <ThreadPrimitive.If running>
              <ComposerPrimitive.Cancel asChild>
                <TooltipIconButton
                  tooltip="Cancel"
                  variant="default"
                  className="aui-composer-cancel"
                >
                  <StopCircleIcon />
                </TooltipIconButton>
              </ComposerPrimitive.Cancel>
            </ThreadPrimitive.If>
          </ComposerPrimitive.Root>
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

export default App;
