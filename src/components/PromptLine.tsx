"use client";

interface PromptLineProps {
  path: string[];
  command?: string;
}

export default function PromptLine({ path, command }: PromptLineProps) {
  const pathStr = path.length > 0 ? `~/${path.join("/")}` : "~";

  return (
    <div className="flex items-center gap-0 whitespace-pre">
      <span className="text-accent font-bold">❯</span>
      <span className="text-cyan ml-2">noel@portfolio</span>
      <span className="text-muted ml-2">{pathStr}</span>
      {command !== undefined && (
        <span className="text-text ml-2">{command}</span>
      )}
    </div>
  );
}
