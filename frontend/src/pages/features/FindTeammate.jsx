import { Box, Container, Typography } from "@mui/material";

export default function FindTeammate() {
    return (
        <Container maxWidth="lg" sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh", pt: "75px", pb: "30px", display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: { sm: "center", lg: "flex-start" }, gap: 4, overflow: "hidden", width: "100vw" }}>
            <Typography variant="h4">Find a Teammate</Typography>
            <Box sx={{ width: "90%" }}>
                <Typography>Looking for a partner to collaborate on your college activities? <strong>Find a Teammate</strong> helps you connect with like-minded individuals for all kinds of projects and events.</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
                <Typography variant="h6">🔹 Collaborate on ECS or Capstone Projects</Typography>
                <Typography>Find someone with the right skills and ideas to work with you.</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
                <Typography variant="h6">🔹 Join Hackathons & Competitions</Typography>
                <Typography>Need a team for an upcoming challenge? Look for teammates here!</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
                <Typography variant="h6">🔹 Connect for College Events</Typography>
                <Typography>Whether it’s a seminar, workshop, or community activity, find others who are passionate about the same things.</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
                <Typography variant="h6">Get the best team together—find your perfect teammate today!</Typography>
            </Box>
            <Typography variant="h4">Coming soon...</Typography>
        </Container>
    );
}
