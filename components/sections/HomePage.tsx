import { getDictionary, type Locale } from "@/content/i18n";
import { About } from "./About";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Now } from "./Now";
import { ProjectsSection } from "./ProjectsSection";
import { Stack } from "./Stack";

/** Home (one-page). */
export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Marquee label={dict.sections.stack} />
      <About dict={dict} />
      <Experience locale={locale} dict={dict} />
      <ProjectsSection locale={locale} dict={dict} />
      <Stack locale={locale} dict={dict} />
      <Now locale={locale} dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
