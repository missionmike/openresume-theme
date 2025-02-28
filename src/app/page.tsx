import { Box, Container, Typography } from "@mui/material";

export default async function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography component="h1" sx={{ mb: 2, typography: { sm: "h1", xs: "h4" } }}>
          OpenResume Themes
        </Typography>
      </Box>
    </Container>
  );
}
