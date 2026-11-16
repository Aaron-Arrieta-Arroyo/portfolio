import type { Localized } from "./types";

export type Course = {
  title: string;
  /** One line on what the course covers. */
  detail: Localized;
};

/** Completed courses from Anthropic Academy (only "Complete", not "Registered"). */
export const coursesIssuer = "Anthropic Academy";

export const courses: Course[] = [
  {
    title: "Claude Code in Action",
    detail: {
      es: "Sesiones largas y autónomas de Claude Code: dirigir, configurar, automatizar y verificar.",
      en: "Long, hands-off Claude Code sessions: steer, configure, automate and verify.",
    },
  },
  {
    title: "Claude Code 101",
    detail: {
      es: "Claude Code en el flujo diario de desarrollo.",
      en: "Claude Code in the daily development workflow.",
    },
  },
  {
    title: "Introduction to Claude Cowork",
    detail: {
      es: "Trabajo con IA sobre archivos y proyectos reales: plugins, skills y tareas de varios pasos.",
      en: "Working with AI on real files and projects: plugins, skills and multi-step tasks.",
    },
  },
  {
    title: "AI Fluency: Framework & Foundations",
    detail: {
      es: "Colaborar con sistemas de IA de forma efectiva, eficiente, ética y segura.",
      en: "Collaborating with AI systems effectively, efficiently, ethically and safely.",
    },
  },
  {
    title: "Claude 101",
    detail: {
      es: "Uso de Claude para el trabajo diario y sus funciones principales.",
      en: "Using Claude for everyday work and its core features.",
    },
  },
];
