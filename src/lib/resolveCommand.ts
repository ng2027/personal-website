import { CommandNode } from "./types";
import { commands, availableCommands } from "./commands";

interface ResolveResult {
  output: string[];
  newPath: string[];
}

function getNodeAtPath(
  path: string[],
  tree: Record<string, CommandNode>
): CommandNode | null {
  let current: CommandNode | undefined;
  let children: Record<string, CommandNode> | undefined = tree;

  for (const segment of path) {
    if (!children) return null;
    current = children[segment];
    if (!current) return null;
    children = current.children;
  }

  return current ?? null;
}

export function resolveCommand(
  input: string,
  currentPath: string[]
): ResolveResult {
  const trimmed = input.trim().toLowerCase();

  if (!trimmed) {
    return { output: [], newPath: currentPath };
  }

  if (trimmed === "clear") {
    return { output: ["__CLEAR__"], newPath: [] };
  }

  if (trimmed === "home" || trimmed === "cd ~" || trimmed === "cd") {
    return { output: ["Returned to ~"], newPath: [] };
  }

  if (trimmed === "back" || trimmed === "cd ..") {
    if (currentPath.length === 0) {
      return { output: ["Already at root ~"], newPath: [] };
    }
    const newPath = currentPath.slice(0, -1);
    const pathStr = newPath.length > 0 ? `~/${newPath.join("/")}` : "~";
    return { output: [`Navigated to ${pathStr}`], newPath };
  }

  if (trimmed === "help") {
    return {
      output: [
        "Available commands:",
        "",
        ...availableCommands.map((cmd) => {
          const node = commands[cmd];
          const hint = node?.hint ? ` — ${node.hint}` : "";
          return `  ${cmd}${hint}`;
        }),
        "",
        "Navigation:",
        "  back       — go up one level",
        "  home       — return to root",
        "  clear      — clear terminal",
        "",
        "Tip: type '<command> <subcommand>' to dive deeper.",
      ],
      newPath: currentPath,
    };
  }

  const parts = trimmed.split(/\s+/);

  // Try resolving relative to current path first
  if (currentPath.length > 0) {
    const contextNode = getNodeAtPath(currentPath, commands);
    if (contextNode?.children) {
      const result = walkTree(parts, contextNode.children, currentPath);
      if (result) {
        const newPath = result.hasChildren
          ? [...currentPath, ...parts.slice(0, result.depth)]
          : currentPath;
        return { output: result.output, newPath };
      }
    }
  }

  // Then try from root
  const result = walkTree(parts, commands, []);
  if (result) {
    const newPath = result.hasChildren
      ? parts.slice(0, result.depth)
      : currentPath;
    return { output: result.output, newPath };
  }

  return {
    output: [
      `command not found: ${trimmed}`,
      `Type "help" for available commands.`,
    ],
    newPath: currentPath,
  };
}

function walkTree(
  parts: string[],
  tree: Record<string, CommandNode>,
  _basePath: string[]
): { output: string[]; depth: number; hasChildren: boolean } | null {
  let current: CommandNode | undefined;
  let children: Record<string, CommandNode> | undefined = tree;
  let depth = 0;

  for (const part of parts) {
    if (!children) return null;
    current = children[part];
    if (!current) return null;
    depth++;
    children = current.children;
  }

  if (!current) return null;

  const output = [...current.lines];
  const hasChildren = !!(current.children && Object.keys(current.children).length > 0);

  if (hasChildren) {
    const childNames = Object.keys(current.children!);
    output.push("");
    output.push(`  ↳ type '${childNames.join("', '")}' to explore further`);
  }

  return { output, depth, hasChildren };
}
