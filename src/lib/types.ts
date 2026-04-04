export interface CommandNode {
  lines: string[];
  children?: Record<string, CommandNode>;
  hint?: string;
}

export interface HistoryBlock {
  id: number;
  command: string;
  path: string[];
  output: string[];
}

export interface TerminalState {
  history: HistoryBlock[];
  currentPath: string[];
  isAnimating: boolean;
  nextId: number;
}

export type TerminalAction =
  | { type: "EXECUTE_COMMAND"; command: string; output: string[]; newPath: string[] }
  | { type: "SET_ANIMATING"; value: boolean }
  | { type: "CLEAR" };
