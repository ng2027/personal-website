"use client";

import { motion } from "framer-motion";
import { HistoryBlock } from "@/lib/types";
import PromptLine from "./PromptLine";

interface OutputBlockProps {
  block: HistoryBlock;
  animate: boolean;
  onAnimationComplete?: () => void;
}

function renderLine(line: string) {
  const parts = line.split("\x1b");
  if (parts.length <= 1) return <>{line}</>;

  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className={i % 2 === 1 ? "text-accent font-semibold" : ""}>
          {part}
        </span>
      ))}
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
              {line === "" ? "\u00A0" : renderLine(line)}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
