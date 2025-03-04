"use client";

import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { ThemeDefault } from "@/theme";
import { ThemeName } from "@/types";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { useContext } from "react";

export const ResumeView = ({ themeName }: { themeName: ThemeName }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  switch (themeName) {
    case "default":
    default:
      return (
        <ThemeDefault
          themeAppearance={themeAppearance}
          user={themeDefaultSampleData.data.resume.user}
          socials={themeDefaultSampleData.data.resume.socials}
          skillsForUser={themeDefaultSampleData.data.resume.skillsForUser}
          companies={themeDefaultSampleData.data.resume.companies}
          education={themeDefaultSampleData.data.resume.education}
        />
      );
  }
};
