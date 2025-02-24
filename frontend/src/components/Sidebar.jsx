import { useLocation, useNavigate } from "react-router";
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import TopBar from "./TopBar";
import useAuth from "../hooks/useAuth";
import HomeIcon from "@mui/icons-material/Home";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../../public/logo.jpg";
import { useState } from "react";

const drawerWidth = 240;

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const hiddenRoutes = ["/login", "/signup"];

    const [open, setOpen] = useState(false);

    const { logout } = useAuth();
    
    const logout_ = () => {
        logout();
        navigate("/login");
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
      };
    
    if (hiddenRoutes.includes(location.pathname)) return null;

    const navLinks = [
        { page: "Home", icon: <HomeIcon />, link: "/", disabled: false },
        { page: "Travel Partner", icon: <DriveEtaIcon />, link: "/travel-partner", disabled: false },
        { page: "Coming Soon...", icon: <UpcomingIcon />, link: "#", disabled: true },
        { page: "Coming Soon...", icon: <UpcomingIcon />, link: "#", disabled: true },
        { page: "Coming Soon...", icon: <UpcomingIcon />, link: "#", disabled: true },
    ]

    return (
        <>  
            <TopBar />
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ position: "fixed", top: -5, left: 13, zIndex: 1300, color: "text.primary", display: { sm: "block", lg: "none" } }}
                onClick={() => toggleDrawer(false)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={open} variant="permanent" sx={{ bgcolor: "background.default" ,display: { sm: "none", md: "none", lg: "flex" }, justifyContent: "space-between", width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", p: 2,  } }}>
                <Typography variant="h5" sx={{ mb: 2, color: "transparent" }}>_</Typography>
                <List sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    {navLinks.map((navLink, index) => (
                        <ListItem 
                            key={index} 
                            button="true" 
                            sx={{ bgcolor: location.pathname === navLink.link ? "#252525" : "transparent", pointerEvents: navLink.disabled === true ? "none" : "", cursor: "pointer", borderRadius: 2, }} 
                            onClick={() => navigate(navLink.link)}
                        >
                            <ListItemIcon>{navLink.icon}</ListItemIcon>
                            <ListItemText primary={navLink.page} />
                        </ListItem>
                    ))}
                </List>
                <Button sx={{ mt: "auto" }} variant="outlined" onClick={logout_}>Log out</Button>
            </Drawer>
        </>
    );
};