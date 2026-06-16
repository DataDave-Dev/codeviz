import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { DocSlug } from "@/lib/docs";
import Introduction from "./pages/Introduction";
import GettingStarted from "./pages/GettingStarted";
import Languages from "./pages/Languages";
import HowItWorks from "./pages/HowItWorks";

type DocComponent = (props: { lang: Locale }) => ReactNode;

export const DOC_COMPONENTS: Record<DocSlug, DocComponent> = {
  introduction: Introduction,
  "getting-started": GettingStarted,
  languages: Languages,
  "how-it-works": HowItWorks,
};
