# Portfolio — Aarón Arrieta

En vivo: **https://aaron-arrieta.vercel.app**

Portafolio personal. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Motion + Lenis.

## Correrlo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Estructura

```txt
app/(es)/                 Rutas en español  →  /
app/en/                   Rutas en inglés   →  /en
  page.tsx                Home (one-page)
  projects/[slug]/        Casos de estudio (+ imagen Open Graph por proyecto)
  cv/                     CV web imprimible
  not-found.tsx           404 dentro del sitio
  opengraph-image.tsx     Imagen para redes sociales
app/global-not-found.tsx  404 para URLs fuera de ambos idiomas
app/sitemap.ts, robots.ts
app/globals.css           Tokens de diseño, animaciones CSS, estilos de impresión
components/
  layout/                 SiteShell, Navbar, Footer, metadata, og
  sections/               Secciones de la home, CaseStudy, CvPage, 404
  motion/                 Providers (Lenis + LazyMotion), Reveal, Tilt, Magnetic, Counter
  ui/                     Section, Clock, Grain, TechIcon, ProjectCover, CommandPalette
content/
  profile.ts              Nombre, correo, links, fotos
  experience.ts           Experiencia y educación (ES/EN)
  projects.ts             Proyectos y casos de estudio (ES/EN)
  stack.ts                Tecnologías por grupo + marquee
  now.ts                  Bloque "Ahora"
  i18n/es.ts, en.ts       Textos de la interfaz
public/images/            Fotos y capturas de proyectos (WebP, 16:10)
public/cv/                CV en PDF (ES y EN)
assets/fonts/             Geist en TTF para las imágenes Open Graph
```

## Editar contenido

Todo el texto vive en `content/`; no hace falta tocar componentes.

- Experiencia: `content/experience.ts`. **No nombrar la empresa**, solo el tipo de empresa.
- Proyectos: `content/projects.ts`. Cada proyecto genera `/projects/<slug>`. Con `cover` muestra
  la imagen; sin ella, una portada tipográfica con las iniciales.
- Textos de interfaz: `content/i18n/es.ts` y `en.ts` (solo strings; `{n}` se reemplaza con `fmt`).

## Actualizar el CV en PDF

El PDF sale de imprimir la página `/cv` (que ya tiene estilos de impresión, A4, una página):

1. `npm run build && npm run start`
2. Abrir `http://localhost:3000/cv` → Ctrl+P → **Guardar como PDF**, A4, márgenes predeterminados,
   con **gráficos de fondo** activados.
3. Guardar como `public/cv/aaron-arrieta-cv-es.pdf`. Repetir con `/en/cv` → `aaron-arrieta-cv-en.pdf`.

## Atajos

- **⌘K / Ctrl+K**: paleta de comandos (secciones, proyectos, copiar correo, descargar CV, idioma).

## Deploy

Vercel despliega solo con cada push a `main`. La URL pública (sitemap, Open Graph, JSON-LD) es
`productionUrl` en `components/layout/metadata.ts`. Si conectás un dominio propio, cambiá ese valor
o definí `NEXT_PUBLIC_SITE_URL=https://tu-dominio` en Vercel.
