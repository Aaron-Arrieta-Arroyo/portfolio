import { profile } from "@/content/profile";
import { PaletteTrigger } from "@/components/ui/PaletteTrigger";
import { Year } from "@/components/ui/Year";
import type { Dictionary } from "@/content/i18n";

export function Footer({ dict }: { dict: Dictionary }) {
  const links = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: dict.footer.email, href: `mailto:${profile.email}` },
  ];

  return (
    <footer data-print-hide className="border-t border-border">
      <div className="container-site flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="label-mono flex flex-wrap items-center gap-x-3 gap-y-2 leading-relaxed text-muted">
          <span>
            © <Year /> {profile.name}
          </span>
          <span aria-hidden className="text-subtle">·</span>
          <span>{dict.footer.madeWith}</span>
          <span aria-hidden className="hidden text-subtle md:inline">·</span>
          <PaletteTrigger label={dict.palette.open} hint={dict.footer.navigate} />
        </p>
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="label-mono text-muted transition-colors duration-[180ms] hover:text-accent"
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label} <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
