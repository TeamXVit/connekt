import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/user/Home";
import ForgotPassword from "../pages/user/ForgotPassword";
import TravelPartner from "../pages/features/TravelPartner";
import LostFound from "../pages/features/LostFound";
import FindTeammate from "../pages/features/FindTeammate";
import Queries from "../pages/features/Queries";
import UserProfile from "../pages/user/UserProfile";
import { Box } from "@mui/material";

export default function RouteProvider() {
    const location = useLocation();
    
    const token = localStorage.getItem("Connekt-token")

    useEffect(() => {
        switch(location.pathname) {
            case "/":
                document.title = "Home"
                break
            case "/login":
                document.title = "Login"
                break
            case "/signup":
                document.title = "Signup"
                break
            case "/forget-password":
                document.title = "Reset Password"
                break
            case "/travel-partner":
                document.title = "Travel Partner"
                break
            case "/lost-found":
                document.title = "Lost & Found"
                break
            case "/find-teammate":
                document.title = "Find A Teammate"
                break
            case "/queries":
                document.title = "Queries"
                break
            case "/user":
                document.title = "User Profile"
                break
            default:
                document.title = "Connekt"
        }
    }, [location])

    return (
        <Box sx={{ display: "flex" }}>
            <TopBar />
            <Sidebar />
            <Routes>
                <Route path="/login" element={!token ? <Login /> : <Navigate to="/travel-partner"/>}/>
                <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/travel-partner"/>}/>
                <Route path="/travel-partner" element={token ? <TravelPartner /> : <Navigate to="/login"/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="/forgot-password" element={<ForgotPassword />}/>
                <Route path="/lost-found" element={<LostFound />}/>
                <Route path="/find-teammate" element={<FindTeammate />}/>
                <Route path="/queries" element={<Queries />}/>
                <Route path="/user" element={<UserProfile />}/>
            </Routes>
        </Box>
    )
}