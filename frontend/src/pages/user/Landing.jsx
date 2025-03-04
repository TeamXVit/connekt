import { useNavigate } from "react-router";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import Logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";


export default function Landing() {
    const navigate = useNavigate();
    const [serverReady, setServerReady] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                await axios.get("/").then(res=>{
                    console.log(res.data);
                });
                setServerReady(true);
            } catch (error) {
                console.error("Server is not ready yet");
            } finally {
                setLoading(false);
            }
        };
        
        checkServerStatus();
    }, []);

    if (loading) {
        return (
            <Container
                maxWidth="xl"
                sx={{
                    background: 'linear-gradient(180deg, black 0%, red 100%)',
                    color: "white",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    px: { xs: 2, md: 4 }
                }}
            >
                <CircularProgress sx={{ color: "white" }} />
                <Typography variant="h5" sx={{ mt: 2 }}>
                    Waiting for server to start...
                </Typography>
            </Container>
        );
    }

    if (!serverReady) {
        return (
            <Container
                maxWidth="xl"
                sx={{
                    background: 'linear-gradient(180deg, black 0%, red 100%)',
                    color: "white",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    px: { xs: 2, md: 4 }
                }}
            >
                <Typography variant="h5">
                    Server is currently unavailable. Please try again later.
                </Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="xl"
            sx={{
                background: 'linear-gradient(180deg, black 0%, red 100%)',
                color: "text.primary",
                minHeight: "100vh",
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                textAlign: "center",
                px: { xs: 2, md: 4 }
            }}
        >
            {/* Navbar */}
            <Box
                sx={{
                    height: 72,
                    width: "100%",
                    px: { xs: 2, md: 7 },
                    position: "fixed",
                    top: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(5px)",
                    zIndex: 1000
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box component="img" src={Logo} sx={{ width: 40, height: 40 }} />
                    <Typography variant="h6" sx={{ color: "text.primary", fontSize: { xs: "1rem", md: "1.5rem" } }}>
                        ConneKt
                    </Typography>
                </Box>
                <Button variant="outlined" sx={{ color: "white", border: 2, fontSize: { xs: "0.8rem", md: "1rem" } }} onClick={() => navigate("/login")}>
                    Login
                </Button>
            </Box>

            {/* Main Content */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: { xs: 10, md: 0 } }}>
                <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
                    Welcome to ConneKt
                </Typography>
                <Typography variant="h5" sx={{ fontSize: { xs: "1.2rem", md: "1.8rem" } }}>
                    Bridging Campus, Building Community
                </Typography>
                <Typography variant="body1" sx={{ width: { xs: "90%", md: "60%" }, fontSize: { xs: "0.9rem", md: "1.2rem" } }}>
                    ConneKt is your campus hub—connect with peers, find teammates, share knowledge, and make travel plans. Whether you need help with a project, a lost item, or a travel buddy, ConneKt brings our college community together.
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
                    Join now to start connecting and exploring!
                </Typography>
                <Button
                    variant="outlined"
                    sx={{ color: "white", border: 2, fontSize: { xs: "0.8rem", md: "1rem" }, px: 3, py: 1 }}
                    onClick={() => navigate("/signup")}
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
}
