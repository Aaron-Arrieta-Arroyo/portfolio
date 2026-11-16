import { NotFoundTerminal } from "@/components/sections/NotFoundTerminal";
import { getDictionary, localeBase } from "@/content/i18n";

const dict = getDictionary("es");
const base = localeBase("es");

export default function NotFound() {
  return (
    <NotFoundTerminal
      title={dict.notFound.title}
      body={dict.notFound.body}
      links={[
        { label: dict.notFound.home, href: `${base}/`, primary: true },
        { label: dict.notFound.projects, href: `${base}/#projects` },
      ]}
    />
  );
}
