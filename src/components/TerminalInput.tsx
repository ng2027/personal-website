"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";

interface TerminalInputProps {
  currentPath: string[];
  disabled: boolean;
  onCommand: (command: string) => void;
  commandHistory: string[];
}

export default function TerminalInput({
  currentPath,
  disabled,
  onCommand,
  commandHistory,
}: TerminalInputProps) {
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathStr = currentPath.length > 0 ? `~/${currentPath.join("/")}` : "~";

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, [focusInput]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onCommand(value.trim());
      setValue("");
      setHistoryIndex(-1);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setValue(commandHistory[commandHistory.length - 1 - newIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setValue("");
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setValue(commandHistory[commandHistory.length - 1 - newIndex]);
    }

    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      onCommand("clear");
    }
  };

  return (
    <div className="shrink-0 px-4 py-3 border-t border-border/30">
      <div className="flex items-center text-sm md:text-base">
        <span className="text-accent font-bold shrink-0">❯</span>
        <span className="text-cyan ml-2 shrink-0">noel@portfolio</span>
        <span className="text-muted ml-2 shrink-0">{pathStr}</span>
        <div className="relative flex-1 ml-2 min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="absolute inset-0 w-full bg-transparent outline-none text-transparent caret-transparent font-mono"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
          <span className="pointer-events-none text-text whitespace-pre">
            {value}
            <span
              className={`inline-block w-[8px] h-[1.15em] bg-accent/90 align-middle ml-px -mb-px ${
                disabled ? "opacity-0" : "cursor-blink"
              }`}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
