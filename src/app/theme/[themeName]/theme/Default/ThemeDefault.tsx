import { Company, Education as EducationType, SkillForUser, Social, User } from "@/types";

import { Box } from "@mui/material";
import { Education } from "./components/Education";
import { ResumeHeading } from "./components/ResumeHeading";
import { Skills } from "./components/Skills/Skills";
import { WorkExperience } from "./components/WorkExperience/WorkExperience";

export const ThemeDefault = ({
  user,
  socials,
  skillsForUser,
  companies,
  education,
}: {
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
}) => (
  <Box
    component="main"
    sx={{
      position: "relative",
      display: "block",
      maxWidth: "1024px",
      margin: "0 auto",
      paddingBottom: "100px",
    }}
  >
    <ResumeHeading user={user} socials={socials} />

    {skillsForUser?.length ? <Skills skillType="user" skillsForUser={skillsForUser} /> : null}
    {companies?.length ? <WorkExperience companies={companies} /> : null}
    {education?.length ? <Education education={education} /> : null}
  </Box>
);
