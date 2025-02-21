import { Button, Container, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";


export default function Home() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const logout_ = () => {
        logout();
        navigate("/login");
    }
    
    return (
        <Container maxWidth="xl" sx={{  bgcolor: "#f3f4f6" ,height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Typography variant="h1">Home</Typography>
            <Button variant="contained" onClick={logout_}>Log out</Button>
        </Container>
    )
}