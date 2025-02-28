"use client";

import { ThemeDefault } from "@/theme";
import { ThemeName } from "@/types";
import { themeDefaultSampleData } from "@/theme/Default/sampleData";

export const ResumeView = ({ themeName }: { themeName: ThemeName }) => {
  switch (themeName) {
    case "default":
    default:
      return (
        <ThemeDefault
          user={themeDefaultSampleData.data.resume.user}
          socials={themeDefaultSampleData.data.resume.socials}
          skillsForUser={themeDefaultSampleData.data.resume.skillsForUser}
          companies={themeDefaultSampleData.data.resume.companies}
          education={themeDefaultSampleData.data.resume.education}
        />
      );
  }
};
