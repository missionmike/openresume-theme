"use client";

import { Company, Education as EducationType, SkillForUser, User } from "@/types";

import { Box } from "@mui/material";
import { Education } from "./sections/Education";
import { Header } from "./sections/Header";
import React from "react";
import { Skills } from "./sections/Skills";
import { WorkExperience } from "./sections/WorkExperience";

interface PDFViewThemeDefaultOptions {
  showSkillsInWorkExperience: boolean;
}

const defaultThemeOptions: PDFViewThemeDefaultOptions = {
  showSkillsInWorkExperience: true,
};

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
  themeOptions?: PDFViewThemeDefaultOptions;
}

export const PDFViewThemeDefault = ({
  user,
  skillsForUser,
  companies,
  education,
  themeOptions = defaultThemeOptions,
}: PDFViewProps) => {
  const options = { ...defaultThemeOptions, ...themeOptions };

  return (
    <Box
      sx={{
        padding: 0,
        lineHeight: 1.5,
        fontFamily: "Arial",
        color: "#000",
        letterSpacing: 0,
      }}
    >
      <Header user={user} />
      <Skills skillsForUser={skillsForUser} />
      <WorkExperience companies={companies} showSkills={options.showSkillsInWorkExperience} />
      <Education education={education} />
    </Box>
  );
};
