import { Box, Button } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function TopBar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const logout_ = () => {
        logout();
        navigate("/login");
    };

    return (
        <Box maxWidth="xl" sx={{ width: "100vw", height: 48, borderBottom: 1, borderColor: "grey.500" , position: "fixed", top: 0, bgcolor: "background.default", color: "text.primary",  display: "flex", alignItems: "center" }}>
            <Button variant="outlined" onClick={logout_}>Log out</Button>
        </Box>
    );
};