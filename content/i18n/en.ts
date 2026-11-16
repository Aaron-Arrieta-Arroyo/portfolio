import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "Aarón Arrieta — Software Developer",
    description:
      "Software Developer based in Costa Rica: backend, web and mobile. Drupal, .NET, Laravel and Kotlin.",
  },
  nav: {
    skip: "Skip to content",
    home: "Home",
    menu: "Menu",
    close: "Close",
    switchLang: "Cambiar a español",
    clockLabel: "Local time in Costa Rica",
  },
  sections: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    stack: "Stack",
    now: "Now",
    contact: "Contact",
  },
  hero: {
    status: "Available for new projects",
    greetings: ["Hi, I'm", "Hola, soy", "Pura vida, I'm"],
    role: "Software Developer —",
    roleSub: "backend, web & mobile.",
    ctaProjects: "View projects",
    ctaCv: "Download CV",
    scroll: "Scroll",
    photoAlt: "Portrait of Aarón Arrieta smiling, wearing a black shirt",
    photoCaption: "Costa Rica · UTC−6",
  },
  about: {
    lead: [
      { t: "Software developer with a " },
      { t: "B.Sc. in Information Systems Engineering", k: true },
      { t: ". I build " },
      { t: "backend services, web platforms and mobile apps", k: true },
      { t: ": REST APIs, layered architecture and what keeps software healthy in production — " },
      { t: "migrations, QA, CI and documentation", k: true },
      { t: "." },
    ],
    body:
      "Today I work with Drupal 10/11 for public- and private-sector clients, and outside of that I ship with .NET, Laravel, Spring Boot and Kotlin. I care about clean architecture, headless Drupal with Next.js and web security.",
    stats: [
      { value: 30, suffix: "+", label: "Merged team PRs" },
      { text: "D10→11", label: "Core migration led" },
      { value: 4, suffix: "+", label: "Languages in real projects" },
    ],
  },
  experience: {
    work: "Work",
    education: "Education",
  },
  stack: {
    intro: "Tools I use day to day and in team projects.",
  },
  now: {
    title: "~/now",
  },
  contact: {
    title: "Shall we build something?",
    body: "I'm open to Software, Backend or Drupal Developer roles. Write me and I'll reply within 24 h.",
    copy: "Copy",
    copied: "Copied ✓",
    copyLabel: "Copy email",
  },
  footer: {
    madeWith: "Built with Next.js",
    navigate: "to navigate",
    email: "Email",
  },
};

export default en;
