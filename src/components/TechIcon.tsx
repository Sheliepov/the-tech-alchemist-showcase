
import React from "react";
import { Github, Linkedin, Sun, Moon, ArrowDown, ArrowUp, Code } from "lucide-react";

// Map a technology/tool name to a Lucide icon
const techIcons: { [key: string]: React.ReactNode } = {
  "GitHub": <Github size={20} />,
  "LinkedIn": <Linkedin size={20} />,
  "Git": <Code size={20} />,
  "React": <Code size={20} />,
  "Node.js": <Code size={20} />,
  "Express": <Code size={20} />,
  "Django": <Code size={20} />,
  "MongoDB": <Code size={20} />,
  "PostgreSQL": <Code size={20} />,
  "Python": <Code size={20} />,
  "TensorFlow": <Code size={20} />,
  "PyTorch": <Code size={20} />,
  "Jest": <Code size={20} />,
  "Redux": <Code size={20} />,
  "Tailwind": <Code size={20} />,
  "Web3.js": <Code size={20} />,
  "Ethers.js": <Code size={20} />,
  "Solidity": <Code size={20} />,
  "Hardhat": <Code size={20} />,
  "Chainlink": <Code size={20} />,
  "LangChain": <Code size={20} />,
  "LLM APIs": <Code size={20} />,
  "Linux": <Code size={20} />,
  "AWS": <Code size={20} />,
  "Docker": <Code size={20} />,
  "Kubernetes": <Code size={20} />,
  "CI/CD": <Code size={20} />,
  "Vercel": <Code size={20} />,
  "Netlify": <Code size={20} />,
  "Firebase": <Code size={20} />,
  "Redis": <Code size={20} />,
  "Microservices": <Code size={20} />,
  "WebAssembly": <Code size={20} />,
  "PWAs": <Code size={20} />,
  "OpenAI API": <Code size={20} />,
  "Three.js": <Code size={20} />,
  "WebGL": <Code size={20} />,
  "IPFS": <Code size={20} />,
  "ThirdWeb": <Code size={20} />,
  "OAuth": <Code size={20} />,
  "WebSockets": <Code size={20} />,
  "GitHub Actions": <Code size={20} />,
};

export function TechIcon({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-1">
      {techIcons[name] ?? <Code size={20} />}
    </span>
  );
}
