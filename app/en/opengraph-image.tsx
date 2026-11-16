import { ogContentType, ogSize, renderOg } from "@/components/layout/og";
import { getDictionary } from "@/content/i18n";
import { profile } from "@/content/profile";

const dict = getDictionary("en");

export const alt = dict.meta.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: dict.hero.status, title: profile.name, subtitle: "Backend, web & mobile — Drupal · .NET · Laravel · Kotlin" });
}
