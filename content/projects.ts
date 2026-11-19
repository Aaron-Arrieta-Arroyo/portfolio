import type { Localized } from "./types";

export const projectTags = ["Backend", "Web", "Mobile", "Drupal"] as const;
export type ProjectTag = (typeof projectTags)[number];

export type Project = {
  slug: string;
  title: string;
  year: string;
  /** Team size, e.g. 5. Omit for solo work. */
  team?: number;
  status?: Localized;
  role: Localized;
  summary: Localized;
  problem: Localized;
  contribution: Localized<string[]>;
  /** Layers from client to data, drawn as a simple diagram. */
  architecture: { name: string; detail: Localized }[];
  learnings: Localized;
  stack: string[];
  tags: ProjectTag[];
  links: { label: string; href: string }[];
  /** Card / hero image (16:10). Without it a typographic cover is drawn. */
  cover?: string;
  coverAlt?: Localized;
  gallery?: { src: string; alt: Localized; kind: "phone" | "desktop" }[];
  /** Short demo video (16:9) shown on the case study, with a poster frame. */
  video?: { src: string; poster: string; label: Localized };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "leveluplife",
    title: "LevelUpLife",
    year: "2026",
    team: 5,
    role: { es: "Backend (.NET) y Android (Kotlin)", en: "Backend (.NET) and Android (Kotlin)" },
    summary: {
      es: "Plataforma gamificada de hábitos y tareas: XP, niveles y rachas, con API en .NET 9 y app Android.",
      en: "Gamified habits and tasks platform: XP, levels and streaks, with a .NET 9 API and an Android app.",
    },
    problem: {
      es: "Mantener un hábito cuesta cuando el progreso no se ve. LevelUpLife convierte hábitos y tareas en un juego: cada tarea completada da experiencia, sube de nivel al jugador y mantiene su racha.",
      en: "Habits are hard to keep when progress is invisible. LevelUpLife turns habits and tasks into a game: every completed task gives experience, levels the player up and keeps their streak alive.",
    },
    contribution: {
      es: [
        "Infraestructura HTTP base de la API y manejo global de errores.",
        "Endpoints de perfil de jugador: edición con concurrencia optimista, bio y avatar, racha de días y baja lógica de la cuenta.",
        "Ciclo completo de tareas de hábito: crear, actualizar, desactivar y completar.",
        "Gamificación: XP y racha al completar tareas, con nivelación progresiva.",
        "App Android: flujos de crear, editar, desactivar y completar tareas, edición de perfil y desactivación de cuenta.",
      ],
      en: [
        "Base HTTP infrastructure for the API and global error handling.",
        "Player profile endpoints: editing with optimistic concurrency, bio and avatar, day streak and account soft delete.",
        "Full habit-task lifecycle: create, update, deactivate and complete.",
        "Gamification: XP and streak on task completion, with progressive leveling.",
        "Android app: create, edit, deactivate and complete task flows, profile editing and account deactivation.",
      ],
    },
    architecture: [
      { name: "Android · Kotlin", detail: { es: "App móvil del jugador", en: "Player mobile app" } },
      { name: "API REST · .NET 9", detail: { es: "Controllers → Services → Repositories, JWT", en: "Controllers → Services → Repositories, JWT" } },
      { name: "PostgreSQL", detail: { es: "Hábitos, tareas, evidencias y progreso", en: "Habits, tasks, evidence and progress" } },
    ],
    learnings: {
      es: "Diseñar contratos de API pensando en el cliente móvil, devolver errores de forma uniforme y coordinar a cinco personas con cambios pequeños y revisados.",
      en: "Designing API contracts with the mobile client in mind, returning errors consistently, and coordinating five people through small, reviewed changes.",
    },
    stack: [".NET 9", "C#", "PostgreSQL", "JWT", "Kotlin", "Android"],
    tags: ["Backend", "Mobile"],
    links: [
      { label: "Backend", href: "https://github.com/jasonTIZ/LevelUpLife-Backend" },
      { label: "Android", href: "https://github.com/jasonTIZ/LevelUpLife-Frontend" },
    ],
    cover: "/images/projects/leveluplife.webp",
    coverAlt: {
      es: "Dos pantallas de la app LevelUpLife: tarea completada con +10 XP y formulario de nueva tarea",
      en: "Two LevelUpLife app screens: a completed task with +10 XP and the new task form",
    },
    featured: true,
  },
  {
    slug: "ciclo-finca-4",
    title: "Ciclo Finca 4",
    year: "2026",
    team: 4,
    role: { es: "Full stack · Laravel", en: "Full stack · Laravel" },
    summary: {
      es: "Plataforma comercial para una tienda de ciclismo: catálogo, carrito, ventas, inventario y reportes.",
      en: "Commerce platform for a cycling shop: catalog, cart, sales, inventory and reports.",
    },
    problem: {
      es: "Una tienda de ciclismo necesitaba vender en línea y administrar todo desde un solo lugar: catálogo con stock real, pedidos, proveedores y reportes para tomar decisiones.",
      en: "A cycling shop needed to sell online and run everything from one place: a catalog with real stock, orders, suppliers and reports to make decisions.",
    },
    contribution: {
      es: [
        "Carrito de compras de punta a punta para el cliente.",
        "Reportes: historial de compras por cliente y comparación de ventas por rango de fechas.",
        "Bitácora de auditoría de acciones administrativas.",
        "Catálogo: categorías padre, subcategorías, stock mínimo, disponibilidad y SKU en tarjetas, búsquedas en tendencia.",
        "Dashboard y pedidos: KPIs del día, filtros por fecha y auto-actualización.",
        "Calidad: estilos de tablas estandarizados y CI con análisis estático (PHPStan).",
      ],
      en: [
        "End-to-end customer shopping cart.",
        "Reports: purchase history by customer and sales comparison by date range.",
        "Audit log of admin actions.",
        "Catalog: parent categories, subcategories, minimum stock, availability and SKU on cards, trending searches.",
        "Dashboard and orders: daily KPIs, date filters and auto-refresh.",
        "Quality: standardized admin tables and CI with static analysis (PHPStan).",
      ],
    },
    architecture: [
      { name: "React · Inertia", detail: { es: "Tienda y panel de administración", en: "Storefront and admin panel" } },
      { name: "Laravel 13", detail: { es: "Controllers → Services → Eloquent, jobs y notificaciones", en: "Controllers → Services → Eloquent, jobs and notifications" } },
      { name: "MySQL 8 · Docker", detail: { es: "Datos y entorno reproducible; CI en GitHub Actions", en: "Data and reproducible environment; CI on GitHub Actions" } },
    ],
    learnings: {
      es: "Trabajar con historias de usuario y criterios de aceptación, mantener cambios fáciles de revisar y sostener la calidad con CI y análisis estático en un proyecto que crecía cada semana.",
      en: "Working from user stories and acceptance criteria, keeping changes easy to review, and holding quality with CI and static analysis on a project that grew every week.",
    },
    stack: ["Laravel 13", "PHP", "React", "Inertia", "Tailwind", "MySQL", "Docker", "GitHub Actions"],
    tags: ["Web", "Backend"],
    links: [{ label: "GitHub", href: "https://github.com/Darwin-Nunez-10/Ciclo_Finca_4_App" }],
    cover: "/images/projects/ciclo-finca-4.webp",
    coverAlt: {
      es: "Panel de administración de Ciclo Finca 4 con el módulo de reportes",
      en: "Ciclo Finca 4 admin panel showing the reports module",
    },
  },
  {
    slug: "safezone",
    title: "SafeZone",
    video: {
      src: "/videos/safezone-demo.mp4",
      poster: "/videos/safezone-demo.webp",
      label: {
        es: "Demo de SafeZone: mapa de riesgo, reporte de incidentes y panel de administración",
        en: "SafeZone demo: risk map, incident reporting and admin panel",
      },
    },
    year: "2026",
    team: 4,
    role: { es: "Diseño de producto, QA y arquitectura", en: "Product design, QA and architecture" },
    summary: {
      es: "Startup digital de análisis de riesgo territorial y geolocalización para la seguridad ciudadana, con app web y móvil.",
      en: "Digital startup for territorial risk analysis and geolocation for public safety, with a web and a mobile app.",
    },
    problem: {
      es: "La información sobre incidentes de seguridad está dispersa y llega tarde. SafeZone propone que la ciudadanía reporte incidentes geolocalizados y que esa información se convierta en un mapa de riesgo útil, empezando local y pensado para escalar a cualquier ciudad.",
      en: "Information about safety incidents is scattered and arrives late. SafeZone lets citizens report geolocated incidents and turns that data into a useful risk map, starting local and designed to scale to any city.",
    },
    contribution: {
      es: [
        "Diseño de las pantallas del flujo de reporte: incidente, ubicación, evidencia, resumen, mis reportes y detalle, en modo claro y oscuro.",
        "Tickets correctivos de QA en Jira, separados por repositorio y con orden de dependencia.",
        "Arquitectura en tres repositorios: contratos de API, backend y web, con revisión de código en cada cambio.",
      ],
      en: [
        "Screen design for the report flow: incident, location, evidence, summary, my reports and detail, in light and dark mode.",
        "Corrective QA tickets in Jira, split by repository and ordered by dependency.",
        "Architecture across three repositories: API contracts, backend and web, with code review on every change.",
      ],
    },
    architecture: [
      { name: "Web + Móvil", detail: { es: "Funciones diferenciadas por plataforma", en: "Platform-specific features" } },
      { name: "API Contracts", detail: { es: "Contrato compartido entre clientes y backend", en: "Shared contract between clients and backend" } },
      { name: "API", detail: { es: "Reportes geolocalizados y análisis de riesgo", en: "Geolocated reports and risk analysis" } },
    ],
    learnings: {
      es: "Pensar como fundador: problema, modelo de negocio y MVP antes que tecnología, y defender cada decisión de arquitectura.",
      en: "Thinking like a founder: problem, business model and MVP before technology, and defending every architecture decision.",
    },
    stack: ["Jira", "API Contracts", "Web", "Mobile", "Google Stitch"],
    tags: ["Web", "Mobile"],
    links: [],
  },
  {
    slug: "bitacora-poder-liderazgo",
    title: "Bitácora de Poder y Liderazgo",
    year: "2026",
    role: { es: "Full stack", en: "Full stack" },
    summary: {
      es: "App web gamificada para acompañar un programa de 17 semanas, con modo público de solo lectura.",
      en: "Gamified web app that follows a 17-week program, with a public read-only mode.",
    },
    problem: {
      es: "Un programa de 17 semanas necesitaba un lugar para registrar el avance semana a semana y compartirlo: la dueña crea el contenido y el público lo ve en modo de solo lectura.",
      en: "A 17-week program needed one place to log progress week by week and share it: the owner creates the content and the public sees it in read-only mode.",
    },
    contribution: {
      es: [
        "Construcción y despliegue de la app en Vercel con Supabase como backend.",
        "Permisos: creación de contenido solo para la cuenta dueña y vista pública de solo lectura.",
      ],
      en: [
        "Built and deployed the app on Vercel with Supabase as the backend.",
        "Permissions: content creation for the owner account only and a public read-only view.",
      ],
    },
    architecture: [
      { name: "Web app", detail: { es: "Interfaz gamificada por semanas", en: "Week-based gamified interface" } },
      { name: "Supabase", detail: { es: "Auth, base de datos y reglas de acceso", en: "Auth, database and access rules" } },
      { name: "Vercel", detail: { es: "Hosting y despliegue continuo", en: "Hosting and continuous deployment" } },
    ],
    learnings: {
      es: "Modelar permisos por rol desde la base de datos y no solo desde la interfaz.",
      en: "Modeling role permissions at the database level, not only in the UI.",
    },
    stack: ["Supabase", "Vercel", "Web"],
    tags: ["Web"],
    links: [],
  },
  {
    slug: "drupal-headless",
    title: "Drupal headless + Next.js",
    year: "2026",
    status: { es: "En progreso", en: "In progress" },
    role: { es: "Proyecto personal", en: "Personal project" },
    summary: {
      es: "Plataforma de eventos y festivales con Drupal como backend desacoplado y un front en Next.js.",
      en: "Events and festivals platform with Drupal as a decoupled backend and a Next.js front end.",
    },
    problem: {
      es: "Llevar la experiencia de Drupal del trabajo diario a una arquitectura moderna: Drupal administra el contenido y solo expone endpoints; el front vive aparte.",
      en: "Taking day-to-day Drupal experience into a modern architecture: Drupal manages content and only exposes endpoints; the front end lives separately.",
    },
    contribution: {
      es: [
        "Exposición de contenido desde Drupal vía endpoints (Vistas / JSON:API).",
        "Exploración de GraphQL para consultar nodos y filtrar datos.",
        "Front en Next.js que consume la API.",
      ],
      en: [
        "Exposing Drupal content through endpoints (Views / JSON:API).",
        "Exploring GraphQL to query nodes and filter data.",
        "Next.js front end consuming the API.",
      ],
    },
    architecture: [
      { name: "Next.js", detail: { es: "Front desacoplado", en: "Decoupled front end" } },
      { name: "API", detail: { es: "JSON:API / GraphQL", en: "JSON:API / GraphQL" } },
      { name: "Drupal 11", detail: { es: "Contenido, tipos y vistas", en: "Content, types and views" } },
    ],
    learnings: {
      es: "En curso: separar responsabilidades entre CMS y front, y elegir entre REST y GraphQL según la consulta.",
      en: "Ongoing: separating CMS and front-end concerns, and choosing REST or GraphQL per query.",
    },
    stack: ["Drupal 11", "Next.js", "React", "GraphQL", "JSON:API"],
    tags: ["Drupal", "Web"],
    links: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Next project in the list (wraps around). */
export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
