import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Thread } from "@assistant-ui/react";

const App = ({ runtime }) => {
  return (
    <>
      <h1><b>Convert AI</b> <i>Basic</i></h1>
      <div className="h-full">
        <Thread
          assistantAvatar={{
            src: "/usr.png",
            alt: "AI Assistant",
            fallback: "AI"
          }}
          runtime={runtime}
        />
      </div>
    </>
  );
};

export default App;