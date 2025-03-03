import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useTheme, useMediaQuery } from "@mui/material";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import TrainIcon from '@mui/icons-material/Train';
import SearchIcon from '@mui/icons-material/Search';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 240;

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const hiddenRoutes = ["/login", "/signup", "/forgot-password"];

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

    const [open, setOpen] = useState(false);
    

    const toggleDrawer = () => {
        setOpen((prev) => !prev);
      };
    
    if (hiddenRoutes.includes(location.pathname)) return null;

    const navLinks = [
        { page: "Travel Partner", icon: <TrainIcon />, link: "/travel-partner" },
        { page: "Lost & Found", icon: <SearchIcon />, link: "/lost-found" },
        { page: "Find A Teammate", icon: <PeopleOutlineIcon />, link: "/find-teammate" },
        { page: "Queries", icon: <PsychologyAltIcon />, link: "/queries" },
    ]

    return (
        <>  
            {/* <TopBar /> */}
            {!isLargeScreen && (
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ position: "fixed", top: 7, left: 13, zIndex: 1300, color: "text.primary" }}
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
            )}
            <Drawer 
                open={isLargeScreen ? true : open} 
                variant={isLargeScreen ? "permanent" : "temporary"} 
                sx={{ bgcolor: "transparent", justifyContent: "space-between", width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", p: 2,  } }}
            >
                <Typography variant="h5" sx={{ mb: 2, color: "transparent" }}>_</Typography>
                <List sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    {navLinks.map((navLink, index) => (
                        <ListItem 
                            key={index} 
                            sx={{ bgcolor: location.pathname === navLink.link ? theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[300] : "transparent", cursor: "pointer", borderRadius: 2, }} 
                            onClick={() => navigate(navLink.link)}
                        >
                            <ListItemIcon>{navLink.icon}</ListItemIcon>
                            <ListItemText primary={navLink.page} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};