"use client";

import { availableCommands } from "@/lib/commands";

interface CommandBarProps {
  onCommand: (command: string) => void;
  disabled: boolean;
}

export default function CommandBar({ onCommand, disabled }: CommandBarProps) {
  return (
    <div className="shrink-0 px-4 py-2.5 border-t border-border/20 bg-surface/30 flex flex-wrap items-center gap-1.5">
      <span className="text-muted/50 text-[10px] mr-1 select-none hidden sm:inline">cmds:</span>
      {availableCommands.map((cmd) => (
        <button
          key={cmd}
          onClick={() => !disabled && onCommand(cmd)}
          disabled={disabled}
          className="px-2.5 py-0.5 text-[11px] rounded-md border border-border/40 text-muted
            hover:text-accent hover:border-accent/30 hover:bg-accent/5
            transition-all duration-150
            disabled:opacity-30 disabled:cursor-not-allowed
            active:scale-95"
        >
          {cmd}
        </button>
      ))}
    </div>
  );
}
