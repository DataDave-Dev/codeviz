import { redirect } from "next/navigation";

export default async function DocsIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/docs/introduction`);
}
