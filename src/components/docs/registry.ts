import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { DocSlug } from "@/lib/docs";
import Introduction from "./pages/Introduction";
import GettingStarted from "./pages/GettingStarted";
import ReadingTheDiagram from "./pages/ReadingTheDiagram";
import Languages from "./pages/Languages";
import HowItWorks from "./pages/HowItWorks";
import ApiReference from "./pages/ApiReference";
import AddingALanguage from "./pages/AddingALanguage";
import Faq from "./pages/Faq";

type DocComponent = (props: { lang: Locale }) => ReactNode;

export const DOC_COMPONENTS: Record<DocSlug, DocComponent> = {
  introduction: Introduction,
  "getting-started": GettingStarted,
  "reading-the-diagram": ReadingTheDiagram,
  languages: Languages,
  "how-it-works": HowItWorks,
  api: ApiReference,
  "adding-a-language": AddingALanguage,
  faq: Faq,
};
