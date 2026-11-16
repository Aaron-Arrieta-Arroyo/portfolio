import type { Localized } from "./types";

/** Soft skills, shown in the Stack section and in the web CV. */
export const softSkills: { label: Localized; detail: Localized }[] = [
  {
    label: { es: "Liderazgo", en: "Leadership" },
    detail: { es: "Coordino equipos y actividades, y asumo la responsabilidad del resultado.", en: "I coordinate teams and activities, and own the outcome." },
  },
  {
    label: { es: "Comunicación efectiva", en: "Clear communication" },
    detail: { es: "Explico lo técnico con claridad, por escrito y en persona.", en: "I explain technical topics clearly, in writing and in person." },
  },
  {
    label: { es: "Pensamiento crítico", en: "Critical thinking" },
    detail: { es: "Analizo el problema y cuestiono supuestos antes de construir.", en: "I analyze the problem and question assumptions before building." },
  },
  {
    label: { es: "Aprendizaje continuo", en: "Continuous learning" },
    detail: { es: "Aprendo herramientas nuevas rápido y las aplico en proyectos reales.", en: "I pick up new tools fast and apply them to real projects." },
  },
  {
    label: { es: "Trabajo en equipo", en: "Teamwork" },
    detail: { es: "PRs revisados, Scrum y comunicación constante con el equipo.", en: "Reviewed PRs, Scrum and constant communication with the team." },
  },
  {
    label: { es: "Trabajo bajo presión", en: "Working under pressure" },
    detail: { es: "Mantengo la calidad con plazos ajustados y prioridades cambiantes.", en: "I keep quality up under tight deadlines and shifting priorities." },
  },
];
