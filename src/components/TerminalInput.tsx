"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { commands } from "@/lib/commands";
import type { CommandNode } from "@/lib/types";

const TOP_LEVEL_COMPLETIONS = [
  ...Object.keys(commands),
  "help",
  "clear",
  "back",
  "home",
];

function getCompletions(
  input: string,
  currentPath: string[]
): { completions: string[]; base: string } {
  const endsWithSpace = input.endsWith(" ");
  const parts = input.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0 || (parts.length === 1 && !endsWithSpace)) {
    const prefix = (parts[0] ?? "").toLowerCase();

    if (currentPath.length > 0) {
      let node: CommandNode | undefined = commands[currentPath[0]];
      for (const seg of currentPath.slice(1)) {
        node = node?.children?.[seg];
      }
      const childKeys = node?.children ? Object.keys(node.children) : [];
      const subCompletions = prefix
        ? childKeys.filter((k) => k.startsWith(prefix) && k !== prefix)
        : childKeys;
      if (subCompletions.length > 0) {
        return { completions: subCompletions, base: "" };
      }
    }

    const completions = TOP_LEVEL_COMPLETIONS.filter(
      (cmd) => cmd.startsWith(prefix) && cmd !== prefix
    );
    return { completions, base: "" };
  }

  const cmdName = parts[0].toLowerCase();
  const subParts = endsWithSpace ? parts.slice(1) : parts.slice(1, -1);
  const subPrefix = endsWithSpace
    ? ""
    : (parts[parts.length - 1]?.toLowerCase() ?? "");

  let node: CommandNode | undefined = commands[cmdName];
  if (!node) return { completions: [], base: input };

  for (const sp of subParts) {
    node = node.children?.[sp];
    if (!node) return { completions: [], base: input };
  }

  const children = node.children;
  if (!children) return { completions: [], base: input };

  const childKeys = Object.keys(children);
  const completions = subPrefix
    ? childKeys.filter((k) => k.startsWith(subPrefix) && k !== subPrefix)
    : childKeys;

  const base = [cmdName, ...subParts].join(" ") + " ";
  return { completions, base };
}

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
  const [tabState, setTabState] = useState<{
    completions: string[];
    index: number;
    base: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathStr = currentPath.length > 0 ? `~/${currentPath.join("/")}` : "~";

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const focusInput = useCallback(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, [focusInput]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      if (tabState) {
        const nextIndex = (tabState.index + 1) % tabState.completions.length;
        setTabState({ ...tabState, index: nextIndex });
        setValue(tabState.base + tabState.completions[nextIndex]);
      } else {
        const { completions, base } = getCompletions(value, currentPath);
        if (completions.length === 1) {
          setValue(base + completions[0] + " ");
        } else if (completions.length > 1) {
          setTabState({ completions, index: 0, base });
          setValue(base + completions[0]);
        }
      }
      return;
    }

    if (e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt" && e.key !== "Meta") {
      setTabState(null);
    }

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
