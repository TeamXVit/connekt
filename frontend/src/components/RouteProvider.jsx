import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router";
import Sidebar from "../components/Sidebar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import TravelPartner from "../pages/TravelPartner";
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
            case "travel-partner":
                document.title = "Travel Partner"
                break
            default:
                document.title = "Connekt"
        }
    }, [location])

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Routes>
                <Route path="/" element={token ? <Home /> : <Navigate to="/login"/>}/>
                <Route path="/login" element={!token ? <Login /> : <Navigate to="/"/>}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/travel-partner" element={<TravelPartner />}/>
            </Routes>
        </Box>
    )
}