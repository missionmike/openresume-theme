export interface Skill {
  id: string;
  name: string;
  icon: string;
}

export interface SkillForProject {
  id: string;
  description: string;
  skillForUser: SkillForUser;
}

export interface Project {
  id: string;
  name: string;
  description: string;
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
  name: string;
  email: string;
  displayEmail: string;
  location: string;
  title: string;
  siteTitle: string;
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
  icon?: string | null;
  description?: string;
  yearStarted?: number;
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
