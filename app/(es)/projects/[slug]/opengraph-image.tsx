import { ogContentType, ogSize, renderOg } from "@/components/layout/og";
import { getProject, projects } from "@/content/projects";

export const alt = "Caso de estudio — Aarón Arrieta";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return renderOg({
    eyebrow: project ? `${project.year} · ${project.tags.join(" · ")}` : "Project",
    title: project?.title ?? "Project",
    subtitle: project?.summary.es ?? "",
  });
}
