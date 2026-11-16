import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/components/layout/metadata";

export { viewport } from "@/components/layout/metadata";
export const metadata = buildMetadata("es");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="es">{children}</SiteShell>;
}
