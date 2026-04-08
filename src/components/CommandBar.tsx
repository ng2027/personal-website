"use client";

import { commands, availableCommands } from "@/lib/commands";
import { getNodeAtPath } from "@/lib/resolveCommand";

interface CommandBarProps {
  onCommand: (command: string) => void;
  disabled: boolean;
  currentPath: string[];
  hasHistory: boolean;
}

export default function CommandBar({ onCommand, disabled, currentPath, hasHistory }: CommandBarProps) {
  const isRoot = currentPath.length === 0;

  let buttons: string[];
  if (isRoot) {
    buttons = availableCommands;
  } else {
    const node = getNodeAtPath(currentPath, commands);
    const children = node?.children ? Object.keys(node.children) : [];
    buttons = ["back", ...children];
  }

  return (
    <div className="shrink-0 px-4 py-2.5 border-t border-border/50 bg-surface/50 flex flex-wrap items-center gap-1.5">
      <span className="text-muted text-[10px] mr-1 select-none hidden sm:inline">
        {isRoot ? "cmds:" : `~/${currentPath.join("/")}:`}
      </span>
      {buttons.map((cmd) => (
        <button
          key={cmd}
          onClick={() => !disabled && onCommand(cmd)}
          disabled={disabled}
          className={`px-2.5 py-0.5 text-[11px] rounded-md border transition-all duration-150
            disabled:opacity-30 disabled:cursor-not-allowed active:scale-95
            ${cmd === "back"
              ? "border-border/60 text-muted hover:text-text hover:border-border hover:bg-surface"
              : "border-border text-text/70 hover:text-accent hover:border-accent/50 hover:bg-accent/10"
            }`}
        >
          {cmd === "back" ? "← back" : cmd}
        </button>
      ))}
      {hasHistory && (
        <button
          onClick={() => !disabled && onCommand("clear")}
          disabled={disabled}
          className="px-2.5 py-0.5 text-[11px] rounded-md border transition-all duration-150
            disabled:opacity-30 disabled:cursor-not-allowed active:scale-95
            border-border/60 text-muted hover:text-red-400 hover:border-red-400/50 hover:bg-red-400/10 ml-auto"
        >
          clear
        </button>
      )}
    </div>
  );
}
