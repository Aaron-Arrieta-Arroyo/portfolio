import { projectRoute } from "@/components/layout/projectPage";

const route = projectRoute("es");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
