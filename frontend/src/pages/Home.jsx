import { Container, Typography } from "@mui/material";
import TopBar from "../components/TopBar";


export default function Home() {
    
    return (
        <Container maxWidth="xl" sx={{  bgcolor: "background.default" , color: "text.primary", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <TopBar />
            <Typography variant="h1">Home</Typography>
        </Container>
    )
}