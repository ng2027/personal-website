"use client";

import { motion } from "framer-motion";

const ASCII_LINES = [
  "███╗   ██╗ ██████╗ ███████╗██╗",
  "████╗  ██║██╔═══██╗██╔════╝██║",
  "██╔██╗ ██║██║   ██║█████╗  ██║",
  "██║╚██╗██║██║   ██║██╔══╝  ██║",
  "██║ ╚████║╚██████╔╝███████╗███████╗",
  "╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝",
  "",
  " ██████╗ ███████╗ ██████╗ ██████╗  ██████╗ ███████╗",
  "██╔════╝ ██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝",
  "██║  ███╗█████╗  ██║   ██║██████╔╝██║  ███╗█████╗  ",
  "██║   ██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  ",
  "╚██████╔╝███████╗╚██████╔╝██║  ██║╚██████╔╝███████╗",
  " ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝",
];

// viewBox sized generously to prevent clipping; height is the controlling dimension
const FONT_SIZE = 10;
const CHAR_W = 7.5;
const LINE_H = 13;
const MAX_CHARS = Math.max(...ASCII_LINES.map((l) => l.length));
const SVG_W = MAX_CHARS * CHAR_W;
const SVG_H = ASCII_LINES.length * LINE_H;

const subLines = [
  { text: "Software Engineer · Full Stack · AI/BackendSystems", className: "text-muted" },
  { text: "", className: "" },
  { text: 'Type "help" to see available commands.', className: "text-cyan/70" },
];

export default function WelcomeBanner() {
  return (
    <motion.div
      className="flex flex-col items-start gap-0.5 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        style={{
          height: "clamp(140px, 28vh, 240px)",
          width: "auto",
          maxWidth: "100%",
          display: "block",
          overflow: "visible",
        }}
        className="mb-1"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
        aria-label="Noel George"
      >
        {ASCII_LINES.map((line, i) =>
          line ? (
            <text
              key={i}
              x="0"
              y={(i + 1) * LINE_H - 1}
              fontFamily="'JetBrains Mono', 'Courier New', monospace"
              fontSize={FONT_SIZE}
              fill="currentColor"
              className="text-accent"
              xmlSpace="preserve"
            >
              {line}
            </text>
          ) : null
        )}
      </motion.svg>

      {subLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 + i * 0.08, ease: "easeOut" as const }}
          className={`leading-relaxed ${line.className}`}
        >
          {line.text || "\u00A0"}
        </motion.div>
      ))}
    </motion.div>
  );
}
