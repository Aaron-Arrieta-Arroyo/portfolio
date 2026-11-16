import type { MetadataRoute } from "next";
import { siteUrl } from "@/components/layout/metadata";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/cv", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
    alternates: { languages: { es: `${siteUrl}${path || "/"}`, en: `${siteUrl}/en${path}` } },
  }));
}
