import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NotFoundTerminal } from "@/components/sections/NotFoundTerminal";
import { Grain } from "@/components/ui/Grain";
import es from "@/content/i18n/es";
import en from "@/content/i18n/en";

export const metadata: Metadata = {
  title: "404 — Aarón Arrieta",
  description: es.notFound.body,
};

/** 404 for URLs outside both locales (the site has two root layouts). */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-svh">
        <main>
          <NotFoundTerminal
            title={es.notFound.title}
            body={es.notFound.body}
            alt={`${en.notFound.title} — ${en.notFound.body}`}
            links={[
              { label: es.notFound.home, href: "/", primary: true },
              { label: "English", href: "/en" },
            ]}
          />
        </main>
        <Grain />
      </body>
    </html>
  );
}
