import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { Avatar, AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useTheme, } from "@mui/material";


export default function TopBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const hiddenRoutes = ["/login", "/signup", "/forgot-password"];

    const { logout } = useAuth();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const theme = useTheme();

    if (hiddenRoutes.includes(location.pathname)) return null;

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    const logout_ = () => {
        logout();
        navigate("/login");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar elevation={0} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: theme.palette.mode === "dark" ? "#121212" : "white", borderBottom: 0.3, borderColor: "grey.500" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: { sm: 3, lg: 0 }, color: "text.primary" }}>Connekt</Typography>
                    <Tooltip title="Open settings">
                        <IconButton  sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                            <Avatar alt="Profile Picture" src="" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "16px" }}
                        anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        keepMounted
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={() => {navigate("/user"); handleCloseUserMenu()}} sx={{ width: "100%" }}>
                            <Typography>View Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => {navigate("/make-post"); handleCloseUserMenu}} sx={{ width: "100%" }}>
                            <Typography>Create Post</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => {navigate("/activities"); handleCloseUserMenu}} sx={{ width: "100%" }}>
                            <Typography>Activities</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => {logout_(); handleCloseUserMenu()}} sx={{ width: "100%" }}>
                            <Typography>Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}