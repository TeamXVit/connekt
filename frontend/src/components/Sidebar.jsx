import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSwipeable } from "react-swipeable";
import TrainIcon from "@mui/icons-material/Train";
import SearchIcon from "@mui/icons-material/Search";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const drawerWidth = 240;

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const hiddenRoutes = ["/", "/login", "/signup", "/forgot-password"];

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => {
    setOpen(state);
  };

  const navLinks = [
    { page: "Travel Partner", icon: <TrainIcon />, link: "/travel" },
    { page: "Find A Teammate", icon: <PeopleOutlineIcon />, link: "/teammate" },
    { page: "Lost & Found", icon: <SearchIcon />, link: "/lostandfound" },
    { page: "Queries", icon: <LiveHelpIcon />, link: "/queries" },
    {
      page: "Anonymous Confessions",
      icon: <NoAccountsIcon />,
      link: "/anonymous",
    },
    { page: "FAQ", icon: <InfoIcon />, link: "/faq" },
    { page: "About Us", icon: <EmojiPeopleIcon />, link: "/about" },
  ];

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => toggleDrawer(false),
    onSwipedRight: () => toggleDrawer(true),
    trackMouse: true,
  });

  if (hiddenRoutes.includes(location.pathname)) return null;

  return (
    <>
      {!isLargeScreen && (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            position: "fixed",
            top: 7,
            left: 13,
            zIndex: 1300,
            color: "text.primary",
          }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      )}
      <div
        {...swipeHandlers}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      <Drawer
        open={isLargeScreen ? true : open}
        variant={isLargeScreen ? "permanent" : "temporary"}
        onClose={() => toggleDrawer(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            p: 2,
            bgcolor: theme.palette.mode === "dark" ? "#121212" : "white",
            color: "text.primary",
            overflowY: "auto", // ensures scroll if content overflows

            // Scrollbar styling
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.mode === "dark" ? "#555" : "#bbb",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "#777" : "#999",
            },
            scrollbarWidth: "thin",
            scrollbarColor: `${
              theme.palette.mode === "dark"
                ? "#555 transparent"
                : "#bbb transparent"
            }`,
          },
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "transparent" }}>
          _
        </Typography>
        <List sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {navLinks.map((navLink, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor:
                  location.pathname === navLink.link
                    ? theme.palette.mode === "dark"
                      ? theme.palette.grey[900]
                      : theme.palette.grey[300]
                    : "transparent",
                cursor: "pointer",
                borderRadius: 2,
              }}
              onClick={() => {
                navigate(navLink.link);
                toggleDrawer(false);
              }}
            >
              <ListItemIcon>{navLink.icon}</ListItemIcon>
              <ListItemText primary={navLink.page} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
