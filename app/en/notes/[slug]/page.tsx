import { noteRoute } from "@/components/layout/notePage";

const route = noteRoute("en");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
