"use client";

import React from "react";
import { motion } from "framer-motion";
import { HistoryBlock } from "@/lib/types";
import PromptLine from "./PromptLine";

interface OutputBlockProps {
  block: HistoryBlock;
  animate: boolean;
  onAnimationComplete?: () => void;
  onCommand: (command: string) => void;
}

// Groups: (1,2) = [label](https://url)  (3,4) = [label](command)  (5) = bare URL
const LINK_RE =
  /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\[([^\]]+)\]\((?!https?:\/\/)([^)]+)\)|((?:https?:\/\/)?(?:[\w-]+\.)+\w{2,}\/[\w./?#=&%@:~-]*[\w/])/g;

function renderSegment(text: string, className?: string, onCommand?: (cmd: string) => void) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  LINK_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(
        <span key={last} className={className}>
          {text.slice(last, match.index)}
        </span>
      );
    }

    const urlLabel = match[1];
    const urlHref  = match[2];
    const cmdLabel = match[3];
    const cmdName  = match[4];
    const bareUrl  = match[5];

    if (cmdLabel && cmdName) {
      // [label](command-name) — runs a terminal command on Ctrl/Cmd+click
      parts.push(
        <span
          key={match.index}
          onClick={(e) => { if (e.ctrlKey || e.metaKey) onCommand?.(cmdName); }}
          className={`${className ?? ""} text-accent font-semibold hover:text-accent/60 transition-colors cursor-pointer`}
          title={`Ctrl+click to run: ${cmdName}`}
        >
          {cmdLabel}
        </span>
      );
    } else {
      // URL link or bare URL
      const label = urlLabel ?? bareUrl;
      const href  = urlHref ?? (bareUrl?.startsWith("http") ? bareUrl : `https://${bareUrl}`);
      parts.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className ?? ""} underline decoration-dotted underline-offset-2 hover:text-accent transition-colors cursor-pointer`}
        >
          {label}
        </a>
      );
    }

    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push(
      <span key={last} className={className}>
        {text.slice(last)}
      </span>
    );
  }

  return parts.length > 0 ? parts : [text];
}

function renderLine(line: string, onCommand: (cmd: string) => void) {
  const parts = line.split("\x1b");
  if (parts.length <= 1) return <>{renderSegment(line, undefined, onCommand)}</>;

  return (
    <>
      {parts.map((part, i) =>
        renderSegment(part, i % 2 === 1 ? "text-accent font-semibold" : undefined, onCommand)
      )}
    </>
  );
}

function getLineClassName(line: string): string {
  if (line.startsWith("command not found")) return "text-red-400";
  if (line.includes("━")) return "text-border";
  if (line.startsWith("  ↳")) return "text-cyan/70 text-[0.85em]";
  if (line.startsWith("Navigated to") || line.startsWith("Returned to") || line.startsWith("Already at"))
    return "text-muted italic";
  if (line.startsWith("  ")) return "text-muted";
  return "text-text";
}

export default function OutputBlock({
  block,
  animate,
  onAnimationComplete,
  onCommand,
}: OutputBlockProps) {
  return (
    <div className="mb-2">
      <PromptLine path={block.path} command={block.command} />
      {block.output.length > 0 && (
        <motion.div
          className="mt-0.5"
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={animate ? { duration: 0.15, staggerChildren: 0.035 } : { duration: 0 }}
          onAnimationComplete={() => {
            if (animate && onAnimationComplete) {
              onAnimationComplete();
            }
          }}
        >
          {block.output.map((line, i) => (
            <motion.div
              key={i}
              initial={animate ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={
                animate
                  ? { duration: 0.15, delay: i * 0.035, ease: "easeOut" as const }
                  : { duration: 0 }
              }
              className={`leading-relaxed ${getLineClassName(line)}`}
            >
              {line === "" ? "\u00A0" : renderLine(line, onCommand)}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
