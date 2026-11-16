import type { Metadata } from "next";
import { CvPage } from "@/components/sections/CvPage";
import { getDictionary, localeBase } from "@/content/i18n";

const dict = getDictionary("es");

export const metadata: Metadata = {
  title: dict.cv.metaTitle,
  description: dict.cv.metaDescription,
  alternates: { canonical: `${localeBase("es")}/cv`, languages: { es: "/cv", en: "/en/cv" } },
};

export default function Page() {
  return <CvPage locale="es" />;
}
