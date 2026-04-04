"use client";

import { HistoryBlock } from "@/lib/types";
import OutputBlock from "./OutputBlock";

interface TerminalOutputProps {
  history: HistoryBlock[];
  animatingId: number | null;
  onAnimationComplete: () => void;
}

export default function TerminalOutput({
  history,
  animatingId,
  onAnimationComplete,
}: TerminalOutputProps) {
  return (
    <>
      {history.map((block) => (
        <OutputBlock
          key={block.id}
          block={block}
          animate={block.id === animatingId}
          onAnimationComplete={
            block.id === animatingId ? onAnimationComplete : undefined
          }
        />
      ))}
    </>
  );
}
