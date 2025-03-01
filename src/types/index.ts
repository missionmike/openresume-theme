export type ThemeAppearance = "dark" | "light";

export type ThemeName = "default";

export interface Skill {
  id: string;
  name: string;
  icon: string | null | undefined;
}

export interface SkillForProject {
  id: string;
  description: string;
  skillForUser: SkillForUser;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  skillsForProject: SkillForProject[];
}

export interface Position {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  projects: Project[];
}

export interface Company {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string | null;
  positions: Position[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  dateAwarded: string;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  displayEmail: string | null;
  location: string | null;
  title: string | null;
  siteTitle: string | null;
  siteDescription: string | null;
  siteImage: string | null;
}

export interface Social {
  id: string;
  userId: string;
  platform: string;
  ref: string;
}

export type SkillType = "project" | "user";

export interface SkillForUser {
  id: string;
  userId: string;
  skill: Skill;
  icon: string | null | undefined;
  description?: string | null;
  yearStarted?: number | null;
  totalYears?: number | null;
}

export interface ResumeData {
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
}

export interface ResponseData {
  resume: ResumeData;
}

export interface Response {
  data: ResponseData;
}
