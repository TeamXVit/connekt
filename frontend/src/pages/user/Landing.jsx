import { useNavigate } from "react-router";
import { Box, Button, Container, Typography } from "@mui/material";
import Logo from "../../assets/logo.png";
import { useEffect } from "react";


export default function Landing() {
    const navigate = useNavigate();

    useEffect(() => {

    }, [])
    
    return (
        <Container maxWidth="xl" sx={{  background: 'linear-gradient(180deg, black 0%, red 100%)', color: "text.primary", minHeight: "100vh", display: "flex", flexDirection: { sm: "column-reverse", lg: "row" }, justifyContent: "center", alignItems: "center", gap: 2 }}>
            <Box sx={{ height: 72, width: "100%", px: 7, position: "fixed", top: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box component="img" src={Logo} sx={{ width: 48 }}></Box>
                    <Typography variant="h5" sx={{ color: "text.primary" }}>Connekt</Typography>
                </Box>
                <Button variant="outlined" sx={{ color: "white", border: 2 }} onClick={() => navigate("/login")}>Login</Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Typography variant="h3" fontWeight="semibold">Welcome to ConneKt</Typography>
                <Typography variant="h4">Bridging Campus, Building Community</Typography>
                <Typography variant="h5" sx={{ width: { sm: "90%", lg: "50%" }, textAlign: "center" }}>ConneKt is your campus hub—connect with peers, find teammates, share knowledge, and make travel plans. Whether you need help with a project, a lost item, or a travel buddy, ConneKt brings our college community together.</Typography>
                <Typography variant="body1">Join now to start connecting and exploring!</Typography>
                <Button variant="outlined" sx={{ color: "white", border: 2 }} onClick={() => navigate("/signup")}>Sign Up</Button>
            </Box>
        </Container>
    )
}