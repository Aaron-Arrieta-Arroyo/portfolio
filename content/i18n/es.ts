type Stat = { label: string; value?: number; suffix?: string; text?: string };
type Run = { t: string; k?: boolean };

const es = {
  meta: {
    title: "Aarón Arrieta — Software Developer",
    description:
      "Software Developer en Costa Rica: backend, web y mobile. Drupal, .NET, Laravel y Kotlin.",
  },
  nav: {
    skip: "Saltar al contenido",
    home: "Inicio",
    menu: "Menú",
    close: "Cerrar",
    switchLang: "Switch to English",
    clockLabel: "Hora local en Costa Rica",
  },
  sections: {
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    stack: "Stack",
    now: "Ahora",
    contact: "Contacto",
  },
  hero: {
    status: "Disponible para nuevos proyectos",
    greetings: ["Hola, soy", "Hello, I'm", "Pura vida, soy"],
    role: "Software Developer —",
    roleSub: "backend, web & mobile.",
    ctaProjects: "Ver proyectos",
    ctaCv: "Descargar CV",
    scroll: "Scroll",
    photoAlt: "Retrato de Aarón Arrieta sonriendo, con camisa negra",
    photoCaption: "Costa Rica · UTC−6",
  },
  about: {
    lead: <Run[]>[
      { t: "Desarrollador de software con " },
      { t: "bachillerato en Ingeniería en Sistemas de Información", k: true },
      { t: ". Construyo " },
      { t: "servicios backend, plataformas web y apps móviles", k: true },
      { t: ": APIs REST, arquitectura por capas y lo que mantiene el software sano en producción — " },
      { t: "migraciones, QA, CI y documentación", k: true },
      { t: "." },
    ],
    body:
      "Hoy trabajo con Drupal 10/11 para clientes del sector público y privado, y fuera de eso entrego con .NET, Laravel, Spring Boot y Kotlin. Me interesa la arquitectura limpia, Drupal desacoplado con Next.js y la seguridad web.",
    stats: <Stat[]>[
      { value: 30, suffix: "+", label: "PRs integrados en equipo" },
      { text: "D10→11", label: "Migración de core liderada" },
      { value: 4, suffix: "+", label: "Lenguajes en proyectos reales" },
    ],
  },
  experience: {
    work: "Trabajo",
    education: "Educación",
  },
  stack: {
    intro: "Herramientas con las que trabajo a diario y en proyectos de equipo.",
  },
  now: {
    title: "~/ahora",
  },
  contact: {
    title: "¿Construimos algo?",
    body: "Estoy abierto a oportunidades como Software, Backend o Drupal Developer. Escribime y respondo en menos de 24 h.",
    copy: "Copiar",
    copied: "Copiado ✓",
    copyLabel: "Copiar correo",
  },
  footer: {
    madeWith: "Hecho con Next.js",
    navigate: "para navegar",
    email: "Correo",
  },
};

export default es;
export type Dictionary = typeof es;
