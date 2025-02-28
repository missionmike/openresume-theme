import { themeAuthor, titleSuffix } from "@/constants";

import { Metadata } from "next";
import { PDFView } from "../PDFView";
import { ThemeName } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ themeName: string }>;
}): Promise<Metadata> {
  const { themeName } = await params;

  const title = `PDF Theme: ${themeName} ${titleSuffix}`;
  const description = `This is the ${themeName} theme for OpenResume.`;
  const author = themeAuthor?.[themeName] || themeAuthor?.default;
  return {
    title,
    description,
    authors: [
      {
        name: author,
      },
    ],
    openGraph: {
      title,
      description,
      images: [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ themeName: ThemeName }> }) {
  const { themeName } = await params;

  return <PDFView themeName={themeName} />;
}
