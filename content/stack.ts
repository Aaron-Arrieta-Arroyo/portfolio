import {
  siAndroid, siCss, siDocker, siDotnet, siDrupal, siGit, siGithubactions, siHtml5, siJavascript,
  siKotlin, siLaravel, siLinux, siMysql, siNextdotjs, siOpenjdk, siPhp, siPostgresql, siPython,
  siReact, siSpringboot, siSupabase, siTailwindcss, siTypescript, siVercel,
} from "simple-icons";
import type { Localized } from "./types";

export type Tech = {
  name: string;
  /** SVG path (24×24). Without it a monogram is shown. */
  path?: string;
  monogram?: string;
};

export type StackGroup = { id: string; title: Localized; items: Tech[] };

const t = (name: string, icon?: { path: string }, monogram?: string): Tech => ({ name, path: icon?.path, monogram });

export const stack: StackGroup[] = [
  {
    id: "backend",
    title: { es: "Backend", en: "Backend" },
    items: [
      t(".NET", siDotnet), t("C#", undefined, "C#"), t("Laravel", siLaravel), t("PHP", siPhp),
      t("Spring Boot", siSpringboot), t("Java", siOpenjdk), t("Python", siPython),
    ],
  },
  {
    id: "web",
    title: { es: "Web", en: "Web" },
    items: [
      t("Drupal 11", siDrupal), t("React", siReact), t("Next.js", siNextdotjs), t("TypeScript", siTypescript),
      t("JavaScript", siJavascript), t("Tailwind", siTailwindcss), t("HTML", siHtml5), t("CSS", siCss),
    ],
  },
  {
    id: "mobile",
    title: { es: "Mobile", en: "Mobile" },
    items: [t("Kotlin", siKotlin), t("Android", siAndroid)],
  },
  {
    id: "data",
    title: { es: "Datos & DevOps", en: "Data & DevOps" },
    items: [
      t("PostgreSQL", siPostgresql), t("MySQL", siMysql), t("Supabase", siSupabase), t("Docker", siDocker),
      t("Git", siGit), t("GitHub Actions", siGithubactions), t("Azure", undefined, "Az"), t("Vercel", siVercel),
      t("Linux", siLinux),
    ],
  },
];

/** Items shown in the hero marquee, in order. */
export const marquee: Tech[] = [
  "Drupal 11", ".NET", "Laravel", "Kotlin", "Spring Boot", "Next.js", "React", "TypeScript",
  "PostgreSQL", "Docker", "Supabase", "GitHub Actions",
].map((name) => stack.flatMap((g) => g.items).find((i) => i.name === name)!);
