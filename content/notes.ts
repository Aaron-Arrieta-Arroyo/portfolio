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
    slug: "como-trabajo-con-ia",
    date: "2026-11-19",
    minutes: 6,
    tags: ["Claude", "Claude Code", "AI Fluency", "Agentes"],
    title: {
      es: "Cómo trabajo con IA: Claude, Claude Code y otros agentes",
      en: "How I work with AI: Claude, Claude Code and other agents",
    },
    summary: {
      es: "Delegar bien, describir con precisión, revisar todo y hacerme cargo del resultado: el marco de las 4D aplicado al desarrollo de software.",
      en: "Delegate well, describe precisely, review everything and own the result: the 4D framework applied to software development.",
    },
    body: {
      es: [
        { p: "La IA ya es parte de cómo trabajo: para programar, investigar, documentar, diseñar y aprender. Completé cinco cursos de **Anthropic Academy** (Claude 101, Claude Code 101, Claude Code in Action, Introduction to Claude Cowork y AI Fluency: Framework & Foundations). El último propone cuatro competencias para colaborar con IA de forma efectiva, eficiente, ética y segura, las **4D**: Delegación, Descripción, Discernimiento y Diligencia. Es la forma en que ordeno mi trabajo con estas herramientas." },
        { h: "1. Delegación: elegir qué hace la IA y qué hago yo" },
        { p: "No todas las tareas se delegan igual, ni a la misma herramienta:" },
        { ul: [
          "**Claude**, en conversación, para pensar y producir: planear, investigar, explicar conceptos, redactar y revisar documentación, y explorar ideas de diseño. Los proyectos y la memoria mantienen el contexto entre conversaciones.",
          "**Claude Code** para el trabajo con código y terminal: entender un repositorio, implementar cambios, correr pruebas, automatizar tareas repetitivas y preparar entornos de desarrollo.",
          "**Agentes que trabajan sobre archivos y el navegador** para tareas de varios pasos con documentos, hojas de cálculo o sitios web.",
          "**Otras herramientas de IA** cuando encajan mejor en una tarea concreta. No hace falta casarse con una sola.",
        ] },
        { p: "Lo que no delego es el criterio: qué se construye, qué se publica, qué datos se pueden usar y cuándo algo está realmente terminado." },
        { h: "2. Descripción: encargos claros" },
        { p: "Un buen resultado empieza con un buen encargo. Mis prompts para tareas grandes siguen una estructura parecida:" },
        { code: "Objetivo:     qué quiero lograr y para quién\nContexto:     stack, archivos clave, decisiones ya tomadas\nReglas:       qué no se toca, qué datos no se usan, qué requiere aprobación\nPasos:        en orden, con un punto de control al final de cada uno\nListo cuando: criterios verificables (tests, build, comportamiento)", lang: "text" },
        { p: "Cuando hay varias piezas que se conectan, un diagrama simple vale más que varios párrafos. Y aprovecho el contexto que ya existe: archivos como `CLAUDE.md` o `AGENTS.md` con las convenciones del proyecto, y documentos de contexto que el agente lee antes de empezar." },
        { h: "3. Discernimiento: revisar con evidencia" },
        { ul: [
          "**Pruebas, no promesas**: cada paso termina con algo verificable, como un test que pasa, un build limpio, una respuesta de la API o un log.",
          "**Medir en lugar de suponer**: rendimiento, accesibilidad o tamaño se miden con herramientas, no a ojo.",
          "**Leer lo que cambió** antes de aceptarlo, igual que en una revisión de código entre personas.",
          "**Cuestionar el resultado**: si algo se ve genérico o no encaja con el proyecto, se pide otra versión con más criterio.",
          "**Datos reales o ninguno**: los números y las afirmaciones se comprueban en la fuente.",
        ] },
        { h: "4. Diligencia: hacerme cargo" },
        { ul: [
          "**Confidencialidad**: la información de clientes y empleadores no se comparte; para demos y pruebas uso datos de ejemplo o anonimizados.",
          "**Respeto por el código ajeno**: en repositorios compartidos, los cambios siguen el flujo del equipo (ramas, revisión, aprobación).",
          "**Límites explícitos**: cuando un agente actúa en mi nombre, las acciones sensibles o irreversibles requieren mi confirmación.",
          "**Transparencia**: si la IA participó, se reconoce, y la responsabilidad sobre lo que se publica es mía.",
        ] },
        { h: "En resumen" },
        { ol: [
          "**La herramienta correcta para cada tarea**, no una sola para todo.",
          "**Contexto completo y explícito**, con reglas claras desde el inicio.",
          "**Evidencia en cada paso** y una revisión humana al final.",
          "**Scripts y documentación** para que el trabajo se pueda repetir.",
          "**El criterio no se delega**: la IA me hace más rápido, pero las decisiones son mías.",
        ] },
      ],
      en: [
        { p: "AI is part of how I work: to code, research, document, design and learn. I completed five **Anthropic Academy** courses (Claude 101, Claude Code 101, Claude Code in Action, Introduction to Claude Cowork and AI Fluency: Framework & Foundations). The last one proposes four competencies for collaborating with AI effectively, efficiently, ethically and safely, the **4Ds**: Delegation, Description, Discernment and Diligence. It's how I organize my work with these tools." },
        { h: "1. Delegation: choosing what AI does and what I do" },
        { p: "Not every task is delegated the same way, or to the same tool:" },
        { ul: [
          "**Claude**, in conversation, to think and produce: planning, research, explaining concepts, writing and reviewing documentation, and exploring design ideas. Projects and memory keep context across conversations.",
          "**Claude Code** for work in code and the terminal: understanding a repository, implementing changes, running tests, automating repetitive tasks and setting up development environments.",
          "**Agents that work on files and the browser** for multi-step tasks with documents, spreadsheets or websites.",
          "**Other AI tools** when they fit a specific task better. There's no need to stick to just one.",
        ] },
        { p: "What I don't delegate is judgment: what gets built, what gets published, which data can be used and when something is truly done." },
        { h: "2. Description: clear briefs" },
        { p: "A good result starts with a good brief. My prompts for larger tasks follow a similar structure:" },
        { code: "Goal:       what I want to achieve and for whom\nContext:    stack, key files, decisions already made\nRules:      what not to touch, what data not to use, what needs approval\nSteps:      in order, with a checkpoint at the end of each\nDone when:  verifiable criteria (tests, build, behavior)", lang: "text" },
        { p: "When several pieces connect, a simple diagram beats several paragraphs. And I reuse the context that already exists: files like `CLAUDE.md` or `AGENTS.md` with the project's conventions, and context documents the agent reads before starting." },
        { h: "3. Discernment: review with evidence" },
        { ul: [
          "**Proof, not promises**: each step ends with something verifiable, like a passing test, a clean build, an API response or a log.",
          "**Measure instead of assuming**: performance, accessibility or size are measured with tools, not eyeballed.",
          "**Read what changed** before accepting it, just like a code review between people.",
          "**Challenge the output**: if something looks generic or doesn't fit the project, ask for another version with more judgment.",
          "**Real data or none**: numbers and claims are checked at the source.",
        ] },
        { h: "4. Diligence: owning the result" },
        { ul: [
          "**Confidentiality**: client and employer information isn't shared; demos and tests use sample or anonymized data.",
          "**Respect for others' code**: in shared repositories, changes follow the team's workflow (branches, review, approval).",
          "**Explicit limits**: when an agent acts on my behalf, sensitive or irreversible actions need my confirmation.",
          "**Transparency**: if AI took part, it's acknowledged, and responsibility for what gets published is mine.",
        ] },
        { h: "In short" },
        { ol: [
          "**The right tool for each task**, not one tool for everything.",
          "**Complete, explicit context**, with clear rules from the start.",
          "**Evidence at every step** and a human review at the end.",
          "**Scripts and documentation** so the work can be repeated.",
          "**Judgment isn't delegated**: AI makes me faster, but the decisions are mine.",
        ] },
      ],
    },
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);
