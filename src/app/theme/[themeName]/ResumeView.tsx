"use client";

import { Company, Education, SkillForUser, Social, User } from "@/types";

import { ThemeDefault } from "./theme";
import { ThemeName } from "./page";

export const ResumeView = ({
  themeName,
  user,
  socials,
  skillsForUser,
  companies,
  education,
}: {
  themeName: ThemeName;
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
}) => {
  switch (themeName) {
    case "default":
    default:
      return (
        <ThemeDefault
          user={user}
          socials={socials}
          skillsForUser={skillsForUser}
          companies={companies}
          education={education}
        />
      );
  }
};
