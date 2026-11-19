import type { Localized } from "./types";

/**
 * Articles ("Escritos"). Body blocks are rendered by components/sections/NotePage.tsx.
 * Inline text supports `code` and **bold**.
 * Confidentiality: never name the employer, its clients or client projects.
 */
export type Block =
  | { p: string }
  | { h: string }
  | { ul: string[] }
  | { ol: string[] }
  | { code: string; lang?: string }
  | { quote: string };

export type Note = {
  slug: string;
  date: string; // ISO
  minutes: number;
  tags: string[];
  title: Localized;
  summary: Localized;
  body: { es: Block[]; en: Block[] };
};

export const notes: Note[] = [
  {
    slug: "migracion-drupal-10-a-11",
    date: "2026-11-19",
    minutes: 6,
    tags: ["Drupal 11", "PHP 8.3", "Pantheon", "Composer"],
    title: {
      es: "Cómo migré un sitio de Drupal 10 a 11 en producción",
      en: "How I migrated a production site from Drupal 10 to 11",
    },
    summary: {
      es: "Análisis antes de tocar nada, saltos por etapas, un punto de retorno y la reunión corta que me ahorró días de conflictos.",
      en: "Analysis before touching anything, staged jumps, a rollback point and the short meeting that saved me days of conflicts.",
    },
    body: {
      es: [
        { p: "Durante mi práctica profesional en una empresa de desarrollo de software me tocó actualizar el core de un sitio Drupal en producción: un directorio con buscador, formularios y mucho contenido estructurado. Éramos tres en la tarea. Yo llevaba el **core y los módulos**, otra persona el **tema** (Emulsify) y otra **revisaba el frontend** para detectar qué se rompía." },
        { h: "El punto de partida" },
        { ul: [
          "Drupal **10.4.0**, PHP **8.2** y Drush 12.",
          "Hosting en **Pantheon**, con ambientes Dev, Test y Live.",
          "Entorno local con Docker y Lando.",
          "Search API + Solr, Webform, Paragraphs y varios módulos contrib y propios.",
        ] },
        { h: "1. Analizar antes de tocar nada" },
        { p: "Antes de correr un solo `composer update` armé un inventario: cada módulo, su versión y si tenía soporte para Drupal 11. Usé un agente de IA para el primer barrido del `composer.json` y del código propio, y validé yo cada hallazgo. El resultado fue un documento con tres columnas: listo, necesita actualización y **dudoso**." },
        { p: "Los dudosos no los borré. Para cada uno propuse opciones (reemplazo en core, otro módulo contrib o un módulo propio) y las llevé al equipo para decidir. Un navegador de contenido sin soporte se desinstaló con aprobación, y para un módulo interno coordinamos su actualización con quien lo mantiene." },
        { h: "2. Saltar por etapas, con un punto de retorno" },
        { p: "No fui directo de 10.4 a 11. Primero subí a la **última 10.x (10.6.18)** con una copia de datos de Dev importada y sanitizada, porque ahí aparecen los avisos de código obsoleto sin romper nada. Antes de cada paso dejé un **tag de git** como punto de retorno. Cada etapa se veía más o menos así:" },
        { code: "git tag before-up\ncomposer require drupal/core-recommended:^10.6 --update-with-all-dependencies\ndrush updb -y && drush cr", lang: "bash" },
        { p: "Con el sitio estable en 10.6, el equipo autorizó **PHP 8.3** en los tres ambientes, y ahí sí el salto a **Drupal 11**. También preparé un script para corregir datos de ubicaciones que estaban mal escritos, aprobado por el equipo antes de correrlo." },
        { h: "3. El problema que no estaba en el plan" },
        { p: "El sitio había nacido de una plantilla base del equipo, y esa base tenía actualizaciones pendientes. Al aplicarlas aparecieron **cientos de conflictos**. Rehice el entorno desde cero y en una copia limpia seguían saliendo **87**. Podría haber pasado días resolviéndolos uno por uno." },
        { p: "En lugar de eso pedí una reunión corta con la persona dueña del sitio. Ahí quedó claro que el sitio ya se había separado de la base hacía tiempo y que **no debía recibir esos cambios**. Seguí sobre mi rama, migré de 10.6 a 11 y subí directo al ambiente. El sitio quedó en Drupal 11 y el equipo pasó a la siguiente fase: componentes con Single Directory Components y atomic design." },
        { h: "Lo que me llevo" },
        { ol: [
          "**Analizar primero**: el inventario de módulos fue el mapa de todo el proyecto.",
          "**Saltos cortos**: la última versión menor primero, y la mayor después.",
          "**Siempre un punto de retorno**: un tag cuesta un segundo y te salva el día.",
          "**No eliminar, proponer**: cada módulo dudoso llegó al equipo con opciones documentadas.",
          "**Preguntar temprano**: una reunión corta valió más que días de conflictos.",
          "**IA con aprobación paso a paso**: el agente propone y ejecuta, pero cada cambio lo reviso yo.",
        ] },
      ],
      en: [
        { p: "During my internship at a software development company I was in charge of upgrading the core of a production Drupal site: a directory with search, forms and a lot of structured content. Three of us shared the task. I owned **core and modules**, a teammate the **theme** (Emulsify), and another one **reviewed the frontend** to catch what broke." },
        { h: "Starting point" },
        { ul: [
          "Drupal **10.4.0**, PHP **8.2** and Drush 12.",
          "Hosted on **Pantheon**, with Dev, Test and Live environments.",
          "Local environment with Docker and Lando.",
          "Search API + Solr, Webform, Paragraphs and several contrib and custom modules.",
        ] },
        { h: "1. Analyze before touching anything" },
        { p: "Before running a single `composer update` I built an inventory: every module, its version and whether it supported Drupal 11. I used an AI agent for the first pass over `composer.json` and the custom code, and validated every finding myself. The result was a document with three columns: ready, needs an update, and **doubtful**." },
        { p: "I didn't delete the doubtful ones. For each I proposed options (a core replacement, another contrib module or a custom one) and took them to the team to decide. An unsupported content browser was uninstalled with approval, and for an internal module we coordinated its update with its maintainer." },
        { h: "2. Jump in stages, with a rollback point" },
        { p: "I didn't go straight from 10.4 to 11. First I moved to the **latest 10.x (10.6.18)** with an imported, sanitized copy of Dev data, because that's where deprecation warnings show up without breaking anything. Before each step I left a **git tag** as a rollback point. Each stage looked roughly like this:" },
        { code: "git tag before-up\ncomposer require drupal/core-recommended:^10.6 --update-with-all-dependencies\ndrush updb -y && drush cr", lang: "bash" },
        { p: "With the site stable on 10.6, the team approved **PHP 8.3** on all three environments, and then came the jump to **Drupal 11**. I also wrote a script to fix misspelled location data, approved by the team before running it." },
        { h: "3. The problem that wasn't in the plan" },
        { p: "The site was born from a base template maintained by the team, and that base had pending updates. Applying them produced **hundreds of conflicts**. I rebuilt the environment from scratch and a clean copy still threw **87**. I could have spent days resolving them one by one." },
        { p: "Instead I asked the site owner for a short meeting. It became clear the site had diverged from the base long ago and **shouldn't receive those changes**. I continued on my branch, migrated from 10.6 to 11 and shipped straight to the environment. The site landed on Drupal 11 and the team moved on to the next phase: components built with Single Directory Components and atomic design." },
        { h: "What I take away" },
        { ol: [
          "**Analyze first**: the module inventory was the map for the whole project.",
          "**Short jumps**: latest minor version first, the major one after.",
          "**Always a rollback point**: a tag takes a second and can save the day.",
          "**Don't delete, propose**: every doubtful module reached the team with documented options.",
          "**Ask early**: a short meeting was worth more than days of conflicts.",
          "**AI with step-by-step approval**: the agent proposes and runs, but I review every change.",
        ] },
      ],
    },
  },
  {
    slug: "drupal-headless-nextjs",
    date: "2026-11-19",
    minutes: 5,
    tags: ["Drupal 11", "Next.js", "JSON:API", "GraphQL"],
    title: {
      es: "Drupal headless con Next.js: separar el CMS del frontend",
      en: "Headless Drupal with Next.js: splitting the CMS from the front end",
    },
    summary: {
      es: "Drupal solo administra contenido y expone endpoints; Next.js se encarga de la experiencia. Cómo elegir entre JSON:API, Vistas y GraphQL.",
      en: "Drupal only manages content and exposes endpoints; Next.js owns the experience. How to choose between JSON:API, Views and GraphQL.",
    },
    body: {
      es: [
        { p: "Trabajo con Drupal todos los días, y quise llevar esa experiencia a una arquitectura moderna en un proyecto propio: una plataforma de eventos y festivales. La idea es simple. **Drupal administra el contenido y solo expone datos**; el frontend vive aparte, en **Next.js**. Es un proyecto en progreso, así que esto es lo que llevo aprendido hasta ahora." },
        { h: "Por qué separar" },
        { ul: [
          "Quien edita sigue usando la interfaz de Drupal, con sus tipos de contenido, roles y revisiones.",
          "El frontend se puede rediseñar o cambiar de framework sin tocar el CMS.",
          "El mismo contenido puede servir a la web, a una app móvil o a otra integración.",
        ] },
        { h: "Tres formas de exponer el contenido" },
        { p: "**JSON:API** viene en el core. Se activa y cada tipo de contenido queda disponible en `/jsonapi/node/{tipo}`, con filtros, orden, paginación y relaciones desde la URL. Para la mayoría de las listas es suficiente." },
        { p: "**Vistas con salida REST** sirven cuando la lista ya existe en Drupal con lógica propia (filtros contextuales, agregaciones) y conviene reusarla tal cual." },
        { p: "**GraphQL** (módulo contrib) brilla cuando una pantalla necesita muchas relaciones en una sola consulta: un evento con sus artistas, el lugar y las fechas, sin varias llamadas encadenadas." },
        { h: "Consumirlo desde Next.js" },
        { p: "Con JSON:API, los filtros van en la URL. Así traigo los próximos eventos publicados, con su imagen incluida, y le pido a Next.js que cachee el resultado 5 minutos:" },
        { code: "const url = new URL(`${process.env.DRUPAL_URL}/jsonapi/node/event`);\nurl.searchParams.set(\"filter[status]\", \"1\");\nurl.searchParams.set(\"sort\", \"field_date\");\nurl.searchParams.set(\"include\", \"field_image\");\nurl.searchParams.set(\"page[limit]\", \"12\");\n\nconst res = await fetch(url, { next: { revalidate: 300 } });\nconst { data, included } = await res.json();", lang: "ts" },
        { p: "Y para que el navegador pueda llamar a Drupal desde otro dominio, hay que habilitar CORS en `services.yml`:" },
        { code: "cors.config:\n  enabled: true\n  allowedHeaders: ['*']\n  allowedMethods: ['GET']\n  allowedOrigins: ['http://localhost:3000']", lang: "yaml" },
        { h: "Lo que estoy aprendiendo" },
        { ol: [
          "**Empezar por JSON:API** y pasar a GraphQL solo donde una pantalla lo justifica.",
          "**Modelar bien el contenido en Drupal** primero: el frontend hereda cualquier mala decisión.",
          "**Pensar el cache desde el inicio**: revalidación por tiempo y, más adelante, por evento cuando se edita un nodo.",
          "**Separar responsabilidades** hace que cada parte sea más fácil de probar y de cambiar.",
        ] },
      ],
      en: [
        { p: "I work with Drupal every day, and I wanted to bring that experience to a modern architecture in a personal project: an events and festivals platform. The idea is simple. **Drupal manages the content and only exposes data**; the front end lives on its own, in **Next.js**. It's a work in progress, so this is what I've learned so far." },
        { h: "Why decouple" },
        { ul: [
          "Editors keep using Drupal's interface, with its content types, roles and revisions.",
          "The front end can be redesigned or moved to another framework without touching the CMS.",
          "The same content can serve the web, a mobile app or another integration.",
        ] },
        { h: "Three ways to expose content" },
        { p: "**JSON:API** ships with core. Enable it and every content type is available at `/jsonapi/node/{type}`, with filtering, sorting, paging and relationships from the URL. For most listings that's enough." },
        { p: "**Views with REST export** help when the listing already exists in Drupal with its own logic (contextual filters, aggregation) and it pays to reuse it as is." },
        { p: "**GraphQL** (contrib module) shines when a screen needs many relationships in a single query: an event with its artists, venue and dates, without chained requests." },
        { h: "Consuming it from Next.js" },
        { p: "With JSON:API, filters go in the URL. This fetches upcoming published events with their image included, and asks Next.js to cache the result for 5 minutes:" },
        { code: "const url = new URL(`${process.env.DRUPAL_URL}/jsonapi/node/event`);\nurl.searchParams.set(\"filter[status]\", \"1\");\nurl.searchParams.set(\"sort\", \"field_date\");\nurl.searchParams.set(\"include\", \"field_image\");\nurl.searchParams.set(\"page[limit]\", \"12\");\n\nconst res = await fetch(url, { next: { revalidate: 300 } });\nconst { data, included } = await res.json();", lang: "ts" },
        { p: "And for the browser to call Drupal from another domain, CORS has to be enabled in `services.yml`:" },
        { code: "cors.config:\n  enabled: true\n  allowedHeaders: ['*']\n  allowedMethods: ['GET']\n  allowedOrigins: ['http://localhost:3000']", lang: "yaml" },
        { h: "What I'm learning" },
        { ol: [
          "**Start with JSON:API** and move to GraphQL only where a screen justifies it.",
          "**Model content well in Drupal** first: the front end inherits every bad decision.",
          "**Think about caching from day one**: time-based revalidation now, and on-demand when a node is edited later.",
          "**Separating responsibilities** makes each part easier to test and to change.",
        ] },
      ],
    },
  },
  {
    slug: "claude-code-en-mi-flujo",
    date: "2026-11-19",
    minutes: 5,
    tags: ["Claude Code", "IA", "Playwright", "adb"],
    title: {
      es: "Cómo uso Claude Code en mi flujo de trabajo",
      en: "How I use Claude Code in my workflow",
    },
    summary: {
      es: "Prompts explícitos, reglas claras y evidencia en cada paso: así levanté dos apps de mi equipo y grabé sus demos sin tocar código ajeno.",
      en: "Explicit prompts, clear rules and evidence at every step: how I ran two of my team's apps and recorded their demos without touching anyone's code.",
    },
    body: {
      es: [
        { p: "Uso agentes de IA todos los días, pero no como piloto automático. Los trato como un compañero muy rápido al que hay que darle **contexto, reglas y una forma de comprobar** lo que hizo. Un ejemplo reciente: preparar los videos de demo de mis proyectos para este portafolio." },
        { h: "1. Un prompt que se pueda ejecutar sin preguntar" },
        { p: "Para levantar LevelUpLife (API en .NET 9, PostgreSQL y una app Android) le pasé a Claude Code un prompt con el objetivo, un diagrama de cómo se conecta todo y los pasos en orden:" },
        { code: "Celular ── USB + adb reverse ──► API .NET (:5223) ──► PostgreSQL (Docker)\n   app debug                       dotnet run             backup del equipo", lang: "text" },
        { p: "Instaló el SDK de Android solo por línea de comandos (sin Android Studio), compiló la app, la instaló por USB y conectó el celular a la API de mi compu con `adb reverse`, sin depender del Wi-Fi." },
        { h: "2. Reglas que no se negocian" },
        { ul: [
          "**Sin commits ni push** en los repos del equipo: los ajustes quedan solo en archivos locales ignorados por git.",
          "**Sin datos reales**: cuenta de demo y datos anonimizados.",
          "**Revisar antes de tocar**: antes de cada toque en el celular, confirmar que la app en pantalla es la correcta.",
        ] },
        { p: "Esa última regla se activó de verdad. El agente vio que en el celular había un chat personal abierto, **se detuvo, borró las capturas y me avisó**. Eso es exactamente lo que quiero de una herramienta que actúa en mi nombre." },
        { h: "3. Evidencia, no promesas" },
        { p: "Le pido que cada paso termine con una prueba: la API responde 200, la app está instalada, el login aparece en el log. Así salieron a la luz problemas reales, por ejemplo una migración del repo que Entity Framework ignoraba y que rompía completar tareas. Lo corregimos solo en la base local y quedó documentado." },
        { p: "Cuando la app se cerraba al iniciar, no adivinamos: el agente leyó el crash con `adb logcat` y encontró la causa exacta (unas preferencias cifradas que ya no coincidían con la clave del sistema)." },
        { h: "4. Grabar demos sin tocar nada" },
        { p: "Para Ciclo Finca 4, una app web en Laravel, el agente levantó todo con Docker y grabó cada flujo con **Playwright**, con cursor visible y ritmo humano. Siete tomas reproducibles con un solo comando: `./grabar-demo`." },
        { h: "Lo que me funciona" },
        { ol: [
          "**Contexto completo y explícito**, con diagramas si hace falta.",
          "**Reglas de seguridad por escrito**, sobre todo con código o dispositivos que no son míos.",
          "**Pedir evidencia en cada paso** y revisar lo que reporta.",
          "**Dejar scripts** para que el trabajo se pueda repetir sin el agente.",
          "**La decisión final es mía**: la IA acelera, pero el criterio no se delega.",
        ] },
      ],
      en: [
        { p: "I use AI agents every day, but not as an autopilot. I treat them like a very fast teammate who needs **context, rules and a way to check** what they did. A recent example: preparing the demo videos of my projects for this portfolio." },
        { h: "1. A prompt that can run without questions" },
        { p: "To run LevelUpLife (a .NET 9 API, PostgreSQL and an Android app) I gave Claude Code a prompt with the goal, a diagram of how everything connects and the steps in order:" },
        { code: "Phone ── USB + adb reverse ──► .NET API (:5223) ──► PostgreSQL (Docker)\n  debug app                      dotnet run             team backup", lang: "text" },
        { p: "It installed the Android SDK from the command line only (no Android Studio), built the app, installed it over USB and connected the phone to my machine's API with `adb reverse`, without depending on Wi-Fi." },
        { h: "2. Non-negotiable rules" },
        { ul: [
          "**No commits or pushes** to team repos: tweaks live only in local, git-ignored files.",
          "**No real data**: a demo account and anonymized data.",
          "**Check before touching**: before every tap on the phone, confirm the right app is on screen.",
        ] },
        { p: "That last rule actually fired. The agent noticed a personal chat open on the phone, **stopped, deleted its screenshots and told me**. That's exactly what I want from a tool acting on my behalf." },
        { h: "3. Evidence, not promises" },
        { p: "I ask for every step to end with proof: the API returns 200, the app is installed, the login shows up in the log. That surfaced real problems, like a migration in the repo that Entity Framework ignored and that broke completing tasks. We fixed it only in the local database and documented it." },
        { p: "When the app crashed on launch we didn't guess: the agent read the crash with `adb logcat` and found the exact cause (encrypted preferences that no longer matched the system key)." },
        { h: "4. Recording demos hands-free" },
        { p: "For Ciclo Finca 4, a Laravel web app, the agent brought everything up with Docker and recorded each flow with **Playwright**, with a visible cursor and human pacing. Seven reproducible takes with a single command: `./grabar-demo`." },
        { h: "What works for me" },
        { ol: [
          "**Complete, explicit context**, with diagrams when needed.",
          "**Written safety rules**, especially with code or devices that aren't mine.",
          "**Ask for evidence at every step** and review what it reports.",
          "**Leave scripts** so the work can be repeated without the agent.",
          "**The final call is mine**: AI speeds things up, but judgment isn't delegated.",
        ] },
      ],
    },
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);
