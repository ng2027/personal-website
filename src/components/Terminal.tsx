"use client";

import { useReducer, useRef, useEffect, useCallback, useState, useMemo } from "react";
import { TerminalState, TerminalAction, HistoryBlock } from "@/lib/types";
import { resolveCommand } from "@/lib/resolveCommand";
import TerminalHeader from "./TerminalHeader";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import CommandBar from "./CommandBar";
import WelcomeBanner from "./WelcomeBanner";

const initialState: TerminalState = {
  history: [],
  currentPath: [],
  isAnimating: false,
  nextId: 0,
};

function reducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case "EXECUTE_COMMAND": {
      const block: HistoryBlock = {
        id: state.nextId,
        command: action.command,
        path: [...state.currentPath],
        output: action.output,
      };
      return {
        ...state,
        history: [...state.history, block],
        currentPath: action.newPath,
        isAnimating: true,
        nextId: state.nextId + 1,
      };
    }
    case "SET_ANIMATING":
      return { ...state, isAnimating: action.value };
    case "CLEAR":
      return { ...state, history: [], currentPath: [] };
    default:
      return state;
  }
}

export default function Terminal() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const outputRef = useRef<HTMLDivElement>(null);

  const commandHistory = useMemo(
    () => state.history.map((b) => b.command),
    [state.history]
  );

  const handleCommand = useCallback(
    (input: string) => {
      if (state.isAnimating) return;

      const { output, newPath } = resolveCommand(input, state.currentPath);

      if (output[0] === "__CLEAR__") {
        dispatch({ type: "CLEAR" });
        return;
      }

      dispatch({
        type: "EXECUTE_COMMAND",
        command: input,
        output,
        newPath,
      });
    },
    [state.isAnimating, state.currentPath, state.nextId]
  );

  const handleAnimationComplete = useCallback(() => {
    dispatch({ type: "SET_ANIMATING", value: false });
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      requestAnimationFrame(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      });
    }
  }, [state.history]);

  const latestId = state.history.length > 0 ? state.history[state.history.length - 1].id : null;
  const animatingId = state.isAnimating ? latestId : null;

  return (
    <div className="w-full max-w-4xl mx-auto h-[85vh] max-h-[900px] flex flex-col rounded-2xl border border-border/50 bg-surface/80 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(167,139,250,0.08)] overflow-hidden">
      <TerminalHeader />
      <div ref={outputRef} className="flex-1 overflow-y-auto p-4 pb-2 text-sm md:text-base">
        {state.history.length === 0 && <WelcomeBanner />}
        <TerminalOutput
          history={state.history}
          animatingId={animatingId}
          onAnimationComplete={handleAnimationComplete}
          onCommand={handleCommand}
        />
      </div>
      <TerminalInput
        currentPath={state.currentPath}
        disabled={state.isAnimating}
        onCommand={handleCommand}
        commandHistory={commandHistory}
      />
      <CommandBar onCommand={handleCommand} disabled={state.isAnimating} currentPath={state.currentPath} />
    </div>
  );
}
