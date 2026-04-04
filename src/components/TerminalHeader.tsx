"use client";

export default function TerminalHeader() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-surface/40 shrink-0">
      <div className="flex gap-[6px]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_4px_rgba(255,95,87,0.3)]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_4px_rgba(254,188,46,0.3)]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_4px_rgba(40,200,64,0.3)]" />
      </div>
      <span className="flex-1 text-center text-muted text-xs tracking-wider select-none">
        noel@portfolio — zsh
      </span>
      <div className="w-[52px]" />
    </div>
  );
}
