import { Button, Container, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";


export default function Home() {
    const { logout } = useAuth();

    return (
        <Container maxWidth="xl" sx={{  bgcolor: "#f3f4f6" ,height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Typography variant="h1">Home</Typography>
            <Button variant="contained" onClick={logout}>Log out</Button>
        </Container>
    )
}