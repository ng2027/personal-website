import { CommandNode } from "./types";

export const commands: Record<string, CommandNode> = {
  whoami: {
    hint: "display user identity",
    lines: ["Noel George"],
  },
  role: {
    hint: "current role",
    lines: ["Software Engineer | Full Stack | AI/Systems"],
  },
  interests: {
    hint: "what I care about",
    lines: ["building useful products, agentic systems, distributed systems"],
  },
  currently: {
    hint: "what I'm working on",
    lines: ["Building Focus — an AI scheduling assistant"],
  },
  about: {
    hint: "who am I",
    lines: [
      "Noel George",
      "Software Engineer based in building at the intersection of",
      "AI, systems, and great user experiences.",
      "",
      "I care about shipping useful products, writing clean code,",
      "and understanding systems deeply.",
    ],
  },
  projects: {
    hint: "view my projects",
    lines: [
      "Available projects (type 'projects <name>' for details):",
      "",
      "  \x1b[focus](focus)\x1b    — AI-powered scheduling assistant",
      "  \x1b[claim](claim)\x1b    — Telegram-based service request platform",
    ],
    children: {
      focus: {
        hint: "AI scheduling assistant",
        lines: [
          "\x1bFocus\x1b",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "AI-powered scheduling assistant with Google Calendar integration.",
          "",
          "  Tech:     Next.js · Python · Google Calendar API · GPT-4",
          "  Status:   In Development",
          "  GitHub:   https://github.com/noel/focus",
          "",
          "Automatically resolves scheduling conflicts and suggests",
          "optimal meeting times using contextual AI.",
        ],
      },
      claim: {
        hint: "service request platform",
        lines: [
          "\x1bClaim\x1b",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "Telegram-based service request platform with DynamoDB backend.",
          "",
          "  Tech:     Node.js · Telegram Bot API · AWS DynamoDB",
          "  Status:   Live",
          "  GitHub:   [github.com/noel/claim](https://github.com/noel/claim)",
          "",
          "Streamlines service requests through conversational Telegram",
          "interface backed by serverless infrastructure.",
        ],
      },
    },
  },
  experience: {
    hint: "work history",
    lines: [
      "Work experience (type 'experience <company>' for details):",
      "",
      "  \x1bplaceholder-1\x1b  — Software Engineer · 2024–Present",
      "  \x1bplaceholder-2\x1b  — Engineering Intern · 2023",
    ],
    children: {
      "placeholder-1": {
        lines: [
          "\x1bPlaceholder Company 1\x1b — Software Engineer",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "2024 – Present",
          "",
          "  • Building full-stack features across the platform",
          "  • Working with distributed systems and event-driven architecture",
          "  • Collaborating on AI-powered product features",
        ],
      },
      "placeholder-2": {
        lines: [
          "\x1bPlaceholder Company 2\x1b — Engineering Intern",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "Summer 2023",
          "",
          "  • Developed internal tooling and automation",
          "  • Contributed to backend API development",
          "  • Shipped features used by thousands of users",
        ],
      },
    },
  },
  skills: {
    hint: "tech stack",
    lines: [
      "Technical skills (type 'skills <category>' for details):",
      "",
      "  \x1blanguages\x1b    — TypeScript · Python · Go · Java",
      "  \x1bfrontend\x1b     — React · Next.js · Tailwind · Framer Motion",
      "  \x1bbackend\x1b      — Node.js · FastAPI · PostgreSQL · Redis",
      "  \x1binfra\x1b        — AWS · Docker · Kubernetes · Terraform",
      "  \x1bai\x1b           — LLMs · RAG · Agents · Fine-tuning",
    ],
    children: {
      languages: {
        lines: [
          "\x1bLanguages\x1b",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "",
          "  TypeScript    ████████████████████  expert",
          "  Python        ████████████████████  expert",
          "  Go            ████████████████░░░░  proficient",
          "  Java          ████████████░░░░░░░░  familiar",
          "  Rust          ████████░░░░░░░░░░░░  learning",
        ],
      },
      frontend: {
        lines: [
          "\x1bFrontend\x1b",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "",
          "  React / Next.js    — primary framework",
          "  Tailwind CSS       — utility-first styling",
          "  Framer Motion      — animations & transitions",
          "  Zustand / Jotai    — state management",
        ],
      },
      backend: {
        lines: [
          "\x1bBackend\x1b",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "",
          "  Node.js / Express  — REST & GraphQL APIs",
          "  FastAPI            — Python async APIs",
          "  PostgreSQL         — primary database",
          "  Redis              — caching & queues",
          "  DynamoDB           — serverless data stores",
        ],
      },
      infra: {
        lines: [
          "\x1bInfrastructure\x1b",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "",
          "  AWS                — Lambda, ECS, S3, SQS",
          "  Docker             — containerization",
          "  Kubernetes         — orchestration",
          "  Terraform          — infrastructure as code",
          "  GitHub Actions     — CI/CD pipelines",
        ],
      },
      ai: {
        lines: [
          "\x1bAI / ML\x1b",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "",
          "  LLM Integration    — OpenAI, Anthropic, local models",
          "  RAG Pipelines      — vector search, embeddings",
          "  Agentic Systems    — tool use, multi-step reasoning",
          "  Fine-tuning        — LoRA, dataset curation",
        ],
      },
    },
  },
  contact: {
    hint: "get in touch",
    lines: [
      "\x1bContact\x1b",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "  Email:      hello@noelgeorge.dev",
      "  GitHub:     github.com/noelgeorge",
      "  LinkedIn:   linkedin.com/in/noelgeorge",
      "  Twitter:    @noelgeorge",
    ],
  },
  resume: {
    hint: "download resume",
    lines: [
      "\x1bResume\x1b",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "  View:       noelgeorge.dev/resume.pdf",
      "  Download:   [link opens in new tab]",
      "",
      "  Last updated: 2024",
    ],
  },
};

export const availableCommands = [
  "about",
  "projects",
  "experience",
  "skills",
  "contact",
  "resume",
  "help",
];
