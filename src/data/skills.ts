import { Skill, skillsSchema } from "@/types";
import { z } from "zod";
import { validateData } from "@/lib/validateData";

export const skills: Skill[] = [
  // ── Frontend ──────────────────────────────────────────────────────────────
  {
    name: "React",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: "Avanzado",
    category: "Frontend",
  },
  {
    name: "Angular",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    level: "Intermedio",
    category: "Frontend",
  },
  {
    name: "Next.js",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    level: "Intermedio",
    category: "Frontend",
  },
  {
    name: "TailwindCSS",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    level: "Avanzado",
    category: "Frontend",
  },
  {
    name: "HTML5",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    level: "Avanzado",
    category: "Frontend",
  },
  {
    name: "CSS3",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    level: "Avanzado",
    category: "Frontend",
  },

  // ── Backend ───────────────────────────────────────────────────────────────
  {
    name: "Laravel",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    level: "Avanzado",
    category: "Backend",
  },
  {
    name: "NestJS",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    level: "Intermedio",
    category: "Backend",
  },
  {
    name: "Express",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    level: "Intermedio",
    category: "Backend",
  },

  // ── Languages ─────────────────────────────────────────────────────────────
  {
    name: "JavaScript",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    level: "Avanzado",
    category: "Languages",
  },
  {
    name: "TypeScript",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: "Avanzado",
    category: "Languages",
  },
  {
    name: "Python",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    level: "Intermedio",
    category: "Languages",
  },
  {
    name: "Java",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    level: "Intermedio",
    category: "Languages",
  },

  // ── Database ──────────────────────────────────────────────────────────────
  {
    name: "PostgreSQL",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    level: "Intermedio",
    category: "Database",
  },
  {
    name: "MySQL",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    level: "Intermedio",
    category: "Database",
  },
  {
    name: "MongoDB",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    level: "Intermedio",
    category: "Database",
  },
  {
    name: "SQL Server",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    level: "Intermedio",
    category: "Database",
  },

  // ── DevOps ────────────────────────────────────────────────────────────────
  {
    name: "Docker",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    level: "Intermedio",
    category: "DevOps",
  },
  {
    name: "AWS",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    level: "Intermedio",
    category: "DevOps",
  },
  {
    name: "Vercel",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    level: "Intermedio",
    category: "DevOps",
  },
  {
    name: "Git",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: "Avanzado",
    category: "DevOps",
  },
  {
    name: "GitHub",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    level: "Avanzado",
    category: "DevOps",
  },
  {
    name: "Linux",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    level: "Intermedio",
    category: "DevOps",
  },
];

validateData(z.array(skillsSchema), skills, "data/skills.ts");
