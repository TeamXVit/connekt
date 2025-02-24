import { Box, Button, Container, Typography } from "@mui/material";
import UserProfile from "../components/UserProfile";

export default function Home() {
    
    return (
        <Container maxWidth="xl" sx={{  bgcolor: "background.default" , color: "text.primary", height: "100vh", display: "flex", flexDirection: { sm: "column-reverse", md: "row" }, justifyContent: { sm: "center", lg: "space-between" }, alignItems: "center", gap: 2, py: { sm: 2, lg: 0 }, pt: { sm: 20, md: 7, lg: 0 } }}>
            <Box container sx={{ width: { sm: "100%", lg: "60%" }, height: { sm: "50vh", lg: "90vh" }, my: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <Typography variant="h4">Welcome User</Typography>
                <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 4 }}>
                    
                    <Button variant="contained">Make a post</Button>
                    <Button variant="contained">View posts</Button>
                    <Button variant="contained">Replied posts</Button>
                    <Button variant="contained">Upvotes</Button>
                </Box>
            </Box>
            <UserProfile />
        </Container>
    )
}