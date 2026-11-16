import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/motion/Providers";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Grain } from "@/components/ui/Grain";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { SpotlightTracker } from "@/components/motion/SpotlightTracker";
import { getDictionary, type Locale } from "@/content/i18n";
import { personJsonLd } from "./metadata";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/** Document shell shared by the Spanish ("/") and English ("/en") root layouts. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          // JSON built from our own static content; "<" is escaped so it can't close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          data-print-hide
          className="label-mono sr-only z-[200] rounded-full bg-accent px-4 py-3 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {dict.nav.skip}
        </a>
        <Providers>
          <Navbar locale={locale} dict={dict} />
          <main id="main">{children}</main>
          <Footer dict={dict} />
          <CommandPalette locale={locale} dict={dict} />
        </Providers>
        <div aria-hidden className="scroll-progress" />
        <SpotlightTracker />
        <CursorFollower />
        <Grain />
      </body>
    </html>
  );
}
