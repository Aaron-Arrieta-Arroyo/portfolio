export const profile = {
  name: "Aarón Arrieta",
  fullName: "Aarón Arrieta Arroyo",
  initials: "AA",
  email: "arrietaaaron0325@gmail.com",
  location: "Costa Rica",
  timeZone: "America/Costa_Rica",
  links: {
    github: "https://github.com/Aaron-Arrieta-Arroyo",
    linkedin: "https://www.linkedin.com/in/aaron-arrieta-arroyo",
  },
  images: {
    portrait: "/images/retrato.jpg",
    avatar: "/images/avatar.jpg",
  },
} as const;

/** Section anchors, in page order. Labels live in content/i18n. */
export const sections = ["about", "experience", "projects", "stack", "now", "notes", "contact"] as const;
export type SectionId = (typeof sections)[number];

/** Sections that appear in the navbar. */
export const navSections = ["about", "experience", "projects", "contact"] as const satisfies readonly SectionId[];
