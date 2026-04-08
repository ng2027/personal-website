"use client";

import { motion } from "framer-motion";

const ASCII_NAME = `
███╗   ██╗ ██████╗ ███████╗██╗
████╗  ██║██╔═══██╗██╔════╝██║
██╔██╗ ██║██║   ██║█████╗  ██║
██║╚██╗██║██║   ██║██╔══╝  ██║
██║ ╚████║╚██████╔╝███████╗███████╗
╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝

 ██████╗ ███████╗ ██████╗ ██████╗  ██████╗ ███████╗
██╔════╝ ██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
██║  ███╗█████╗  ██║   ██║██████╔╝██║  ███╗█████╗
██║   ██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝
╚██████╔╝███████╗╚██████╔╝██║  ██║╚██████╔╝███████╗
 ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 `;

const lines = [
  { text: "Software Engineer · Full Stack · AI/Systems", className: "text-muted" },
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
      <motion.pre
        className="text-accent leading-none text-xs mb-1"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        {ASCII_NAME}
      </motion.pre>
      {lines.map((line, i) => (
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
