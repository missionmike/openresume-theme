import { Metadata } from "next";
import { ResumeView } from "./ResumeView";
import { response } from "./data/defaultTheme";
import { titleSuffix } from "@/constants";

export type ThemeName = "default";

export async function generateMetadata(): Promise<Metadata> {
  const title = `Default Theme ${titleSuffix}`;
  const description = "This is the default theme for OpenResume.";

  return {
    title,
    description,
    authors: [
      {
        name: "Michael R. Dinerstein",
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

  return (
    <ResumeView
      themeName={themeName}
      user={response.data.resume.user}
      socials={response.data.resume.socials}
      skillsForUser={response.data.resume.skillsForUser}
      companies={response.data.resume.companies}
      education={response.data.resume.education}
    />
  );
}
