import {
    ThemeProvider,
    createTheme,
    Fade,
    Box,
    Tabs,
    Tab,
    IconButton,
  } from "@mui/material";
  import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import { useState } from "react";
  
  import {
    Company,
    Education as EducationType,
    SkillForUser,
    Social,
    User,
  } from "@/types";
  
  import { ResumeHeading } from "@/theme/default/components/ResumeHeading";
  import { Skills } from "@/theme/default/components/Skills/Skills";
  import { WorkExperience } from "@/theme/default/components/WorkExperience/WorkExperience";
  import { Education } from "@/theme/default/components/Education";
  
  export const ThemeDavidsTheme = ({
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
  }) => {
    /* ----------  SECTION DATA ---------- */
    const sections: { label: string; render: JSX.Element | null }[] = [
      {
        label: "Skills",
        render:
          skillsForUser?.length ? (
            <Skills skillType="user" skillsForUser={skillsForUser} />
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
    ];
  
    const [active, setActive] = useState<number>(0);
  
    const cycle = (delta: number) => {
      setActive((prev) => (prev + delta + sections.length) % sections.length);
    };
  
    /* ----------  DARK-NAVY THEME ---------- */
    const navyTheme = createTheme({
      palette: {
        mode: "light",
        background: {
          default: "#e3f2fd", // light blue page background
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