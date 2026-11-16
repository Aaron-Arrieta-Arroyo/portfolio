import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/components/layout/metadata";

export { viewport } from "@/components/layout/metadata";
export const metadata = buildMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
