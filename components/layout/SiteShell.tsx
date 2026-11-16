import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/motion/Providers";
import { Grain } from "@/components/ui/Grain";
import { getDictionary, type Locale } from "@/content/i18n";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/** Document shell shared by the Spanish ("/") and English ("/en") root layouts. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="label-mono sr-only z-[200] rounded-full bg-accent px-4 py-3 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {dict.nav.skip}
        </a>
        <Providers>
          <Navbar locale={locale} dict={dict} />
          <main id="main">{children}</main>
          <Footer dict={dict} />
        </Providers>
        <Grain />
      </body>
    </html>
  );
}
