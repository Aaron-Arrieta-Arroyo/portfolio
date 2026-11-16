import type { Localized } from "./types";

export type ExperienceItem = {
  kind: "work" | "education";
  period: Localized;
  role: Localized;
  /** Where. For work: describe the type of company only (no names). */
  place: Localized;
  mode?: Localized;
  highlights: Localized<string[]>;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    kind: "work",
    period: { es: "2026 — hoy", en: "2026 — now" },
    role: { es: "Software Developer", en: "Software Developer" },
    place: { es: "Empresa de desarrollo de software", en: "Software development company" },
    mode: { es: "Remoto", en: "Remote" },
    highlights: {
      es: [
        "Lideré la actualización de core de Drupal 10.4 a 11 en un sitio en producción, con análisis de compatibilidad de módulos y un script de corrección de datos.",
        "Componentes de tema con Single Directory Components (SDC) organizados por atomic design.",
        "Micrositios institucionales en Drupal para un cliente del sector público.",
      ],
      en: [
        "Led a Drupal 10.4 → 11 core upgrade on a production site, including module compatibility analysis and a data-fix script.",
        "Theme components built with Single Directory Components (SDC), organized by atomic design.",
        "Institutional microsites in Drupal for a public-sector client.",
      ],
    },
    tags: ["Drupal 11", "PHP 8.3", "Composer", "Drush", "Lando", "Pantheon", "SDC"],
  },
  {
    kind: "education",
    period: { es: "2023 — 2026", en: "2023 — 2026" },
    role: {
      es: "Bachillerato en Ingeniería en Sistemas de Información",
      en: "B.Sc. in Information Systems Engineering",
    },
    place: { es: "Universidad Nacional (UNA), Costa Rica", en: "Universidad Nacional (UNA), Costa Rica" },
    highlights: {
      es: [
        "Proyectos en equipo de backend, web y móvil: .NET 9, Laravel, Kotlin/Android.",
        "Seguridad informática: auditoría web (pentesting) y análisis forense.",
      ],
      en: [
        "Team projects across backend, web and mobile: .NET 9, Laravel, Kotlin/Android.",
        "Information security: web auditing (pentesting) and forensic analysis.",
      ],
    },
    tags: [".NET", "Laravel", "Kotlin", "Seguridad"],
  },
];
