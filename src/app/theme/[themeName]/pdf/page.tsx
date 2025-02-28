import { PDFView } from "./PDFView";
import { ThemeName } from "../page";
import { response } from "../data/defaultTheme";

export default async function Page({ params }: { params: Promise<{ themeName: ThemeName }> }) {
  const { themeName } = await params;

  return (
    <PDFView
      themeName={themeName}
      user={response.data.resume.user}
      skillsForUser={response.data.resume.skillsForUser}
      companies={response.data.resume.companies}
      education={response.data.resume.education}
    />
  );
}
