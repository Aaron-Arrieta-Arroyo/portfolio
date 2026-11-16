# Portfolio — Aarón Arrieta

Portafolio personal. Next.js (App Router) + TypeScript + Tailwind CSS + Motion + Lenis.

## Correrlo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Estructura

```txt
app/(es)/        Rutas en español  →  /
app/en/          Rutas en inglés   →  /en
app/globals.css  Tokens de diseño (colores, tipografía, easing)
components/
  layout/        SiteShell, Navbar, Footer, metadata
  sections/      Secciones de la home
  motion/        Providers (Lenis + Motion), Reveal
  ui/            Section, Clock, Grain
content/
  profile.ts     Nombre, correo, links, fotos
  experience.ts  Experiencia y educación (ES/EN)
  stack.ts       Tecnologías por grupo + marquee
  now.ts         Bloque "Ahora"
  projects.ts    Proyectos y casos de estudio (ES/EN)
  i18n/es.ts     Textos en español
  i18n/en.ts     Textos en inglés
public/images/   Fotos
```

## Editar contenido

Todo el texto vive en `content/`. No hace falta tocar componentes:

- Datos personales y links: `content/profile.ts`
- Experiencia: `content/experience.ts` (no nombrar la empresa: solo el tipo de empresa)
- Stack: `content/stack.ts`
- "Ahora": `content/now.ts`
- Proyectos: `content/projects.ts`. Cada proyecto genera su página en `/projects/<slug>`.
  Con `cover` muestra la imagen; sin ella, una portada tipográfica con las iniciales.
  Imágenes en `public/images/projects/` (16:10, WebP).
- Textos de la interfaz: `content/i18n/es.ts` y `content/i18n/en.ts`

## Deploy

Vercel: importar el repo y desplegar. Variable opcional `NEXT_PUBLIC_SITE_URL`
con la URL final del sitio (se usa para metadata y Open Graph).
