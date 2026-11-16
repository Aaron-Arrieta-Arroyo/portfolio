import { projectRoute } from "@/components/layout/projectPage";

const route = projectRoute("en");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
