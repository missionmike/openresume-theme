import {
    ThemeProvider,
    createTheme,
    Fade,
    Box,
    Tabs,
    Tab,
    IconButton,
  } from "@mui/material";
  import { TextField, InputAdornment, Menu, MenuItem } from "@mui/material";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import { useState, useMemo } from "react";
  
  import {
    Company,
    Education as EducationType,
    SkillForUser,
    Social,
    User,
    Certification,
  } from "@/types";

  import { ResumeHeading } from "@/theme/default/components/ResumeHeading";
  import { Skills } from "@/theme/default/components/Skills/Skills";
  import { WorkExperience } from "@/theme/default/components/WorkExperience/WorkExperience";
  import { Education } from "@/theme/default/components/Education";
  
  /* ----------  LOCAL TYPES ---------- */
  // Custom shape used by the Projects section (different than the DB Project interface)
  interface ProjectSection {
    name: string;
    techStack: string;
    description: string[];
    metrics?: string;
    links?: { label: string; url: string }[];
  }
  
  export const ThemeDavidsTheme = ({
    user,
    socials,
    skillsForUser,
    companies,
    education,
    projects,
    certifications,
  }: {
    user: User;
    socials: Social[];
    skillsForUser: SkillForUser[];
    companies: Company[];
    education: EducationType[];
    projects?: ProjectSection[];
    certifications?: Certification[];
  }) => {
    /* ----------  FALLBACK SAMPLE DATA ---------- */
    const defaultProjects: ProjectSection[] = [
      {
        name: "QuickCurrency",
        techStack: "Flutter, Firebase, FreeCurrencyAPI",
        description: [
          "Built a real-time currency conversion app with 6 supported currencies, history tracking, and a graphing feature.",
          "Integrated Firebase for user authentication and Firestore to store exchange rate history.",
          "Achieved 300+ app loads with daily exchange rate updates and persistent user data.",
        ],
      },
    ];

    const defaultCertifications: Certification[] = [
      {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "Expected June 2025",
      },
    ];

    // Use provided data if available, otherwise fall back to default examples
    const projectData = projects && projects.length ? projects : defaultProjects;
    const certificationData =
      certifications && certifications.length ? certifications : defaultCertifications;

    /* ----------  SECTION DATA ---------- */
    // Add state for skill filter and filter type
    const [skillFilter, setSkillFilter] = useState("");
    const [filterType, setFilterType] = useState<"skill" | "years">("skill");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [active, setActive] = useState<number>(0);

    const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = (type?: "skill" | "years") => {
      if (type) setFilterType(type);
      setAnchorEl(null);
    };

    // Filter skills based on skillFilter input and filterType
    const filteredSkillsForUser = useMemo(() => {
      if (!skillFilter.trim()) return skillsForUser;
      const filter = skillFilter.trim().toLowerCase();
      return skillsForUser.filter((s) => {
        if (filterType === "skill") {
          return s.skill.name.toLowerCase().includes(filter);
        } else {
          let years = s.totalYears;
          if (years == null && s.yearStarted != null) {
            years = new Date().getFullYear() - s.yearStarted;
          }
          const filterNum = Number(filter);
          return !isNaN(filterNum) && years != null && years >= filterNum;
        }
      });
    }, [skillFilter, skillsForUser, filterType]);
    

    const sections: { label: string; render: JSX.Element | null }[] = [
      {
        label: "Skills",
        render:
          skillsForUser?.length ? (
            <Box>
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={filterType === "skill" ? "Enter Skill" : "Enter Years of Experience"}
                  value={skillFilter}
                  onChange={e => setSkillFilter(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleDropdownClick} edge="end">
                          <ArrowDropDownIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ background: "#fff" }}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleDropdownClose()}
                >
                  <MenuItem onClick={() => handleDropdownClose("skill")}>Skill</MenuItem>
                  <MenuItem onClick={() => handleDropdownClose("years")}>Years of Experience</MenuItem>
                </Menu>
              </Box>
              <Skills skillType="user" skillsForUser={filteredSkillsForUser} />
            </Box>
          ) : null,
      },
      {
        label: "Work Experience",
        render:
          companies?.length ? <WorkExperience companies={companies} /> : null,
      },
      {
        label: "Education",
        render: education?.length ? <Education education={education} /> : null,
      },
      {
        label: "Projects",
        render: projectData.length ? renderProjects() : null,
      },
      {
        label: "Certifications",
        render: certificationData.length ? renderCertifications() : null,
      },
    ];
  
    const cycle = (delta: number) => {
      setActive((prev) => (prev + delta + sections.length) % sections.length);
    };

    /* ----------  HELPER RENDER FUNCTIONS ---------- */
    function renderProjects() {
      return (
        <Box>
          {projectData.map((proj) => (
            <Box key={proj.name} sx={{ mb: 3 }}>
              <Box component="h3" sx={{ fontWeight: "bold", mb: 0.5 }}>
                {proj.name}
              </Box>
              <Box sx={{ fontStyle: "italic", mb: 0.5 }}>{proj.techStack}</Box>
              <ul style={{ marginTop: 0, marginBottom: 0 }}>
                {proj.description.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              {proj.metrics && <Box sx={{ mt: 0.5 }}>{proj.metrics}</Box>}
              {proj.links && proj.links.length > 0 && (
                <Box sx={{ mt: 0.5 }}>
                  {proj.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginRight: 8 }}
                    >
                      {link.label}
                    </a>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      );
    }

    function renderCertifications() {
      return (
        <Box>
          {certificationData.map((cert) => (
            <Box key={cert.name} sx={{ mb: 3 }}>
              <Box component="h3" sx={{ fontWeight: "bold", mb: 0.5 }}>
                {cert.name}
              </Box>
              <Box sx={{ mb: 0.5 }}>
                {cert.issuer}
                {cert.date && ` – ${cert.date}`}
              </Box>
              {cert.credentialUrl && (
                <Box>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Credential
                  </a>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      );
    }
  
    /* ----------  DARK-NAVY THEME ---------- */
    const navyTheme = createTheme({
      palette: {
        mode: "light",
        background: {
          default: "#0d47a1", // light blue page background
          paper: "#bbdefb",   // card/paper background
        },
        primary: {
          main: "#0d47a1",   // navy blue accents
          dark: "#08306b",
          light: "#bbdefb",  // used for skill pill background
          contrastText: "#000000", // text inside primary buttons
        },
        secondary: { main: "#1565c0" },
        text: {
          primary: "#000000",
          secondary: "#1a237e",
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            },
            outlinedPrimary: {
              color: "#000000",
              backgroundColor: "#bbdefb",
              borderColor: "#0d47a1",
              '&:hover': {
                backgroundColor: "#90caf9",
              },
            },
          },
        },
      },
    });
  
    return (
      <ThemeProvider theme={navyTheme}>
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
  
          {/* ----------  TABS & NAV BUTTONS ---------- */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <IconButton onClick={() => cycle(-1)} aria-label="Previous section">
              <NavigateBeforeIcon />
            </IconButton>
            <Tabs
              value={active}
              onChange={(_, v) => setActive(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mx: 2 }}
            >
              {sections.map((s, idx) => (
                <Tab key={s.label} label={s.label} value={idx} />
              ))}
            </Tabs>
            <IconButton onClick={() => cycle(1)} aria-label="Next section">
              <NavigateNextIcon />
            </IconButton>
          </Box>
  
          {/* ----------  CROSS-FADE CONTENT ---------- */}
          <Fade in key={active} timeout={500} unmountOnExit mountOnEnter>
            <Box sx={{ mt: 4 }}>{sections[active].render}</Box>
          </Fade>
        </Box>
      </ThemeProvider>
    );
  };
  
  // keep named export only; barrel file re-exports this component