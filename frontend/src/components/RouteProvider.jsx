import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import LostFound from "../pages/features/LostFound";
import FindTeammate from "../pages/features/FindTeammate";
import Queries from "../pages/features/Queries";
import MakePost from "../pages/user/MakePost";
import Activities from "../pages/user/Activities";
import { Box, Typography } from "@mui/material";

const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const TravelPartner = lazy(() => import("../pages/features/TravelPartner"));

export default function RouteProvider() {
    const location = useLocation();
    
    const token = localStorage.getItem("Connekt-token");
    
    const hiddenRoutes = ["/login", "/signup", "/forgot-password"];
    const isAuthPage = hiddenRoutes.includes(location.pathname)

    useEffect(() => {
        const titles = {
            "/": "Home",
            "/login": "Login",
            "/signup": "Signup",
            "/forgot-password": "Reset Password",
            "/travel-partner": "Travel Partner",
            "/lost-found": "Lost & Found",
            "/find-teammate": "Find A Teammate",
            "/queries": "Queries",
            "/user": "User Profile",
            "/make-post": "Make A Post",
            "/activities": "My Activities",
        };
        document.title = titles[location.pathname] || "Connekt";
    }, [location]);

    if (!token && location.pathname === "/") {
        return <Navigate to="/login" replace />;
    }

    if (token && location.pathname === "/") {
        return <Navigate to="/travel-partner" replace/>
    }
    

    return (  
        <>
            {isAuthPage ? (
                <Routes>
                    <Route path="/login" element={!token ? <Login /> : <Navigate to="/travel-partner" />} />
                    <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/travel-partner" />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            ) : (
                <Box sx={{ display: "flex" }}>
                    <TopBar />
                    <Sidebar />
                    <Routes>
                        <Route 
                            path="/travel-partner" 
                            element={token ? 
                            <Suspense fallback={<Typography variant="h3">🌀 Loading...</Typography>}>
                                <TravelPartner />
                            </Suspense> : 
                            <Navigate to="/login" />} 
                        />
                        <Route path="/lost-found" element={<LostFound />} />
                        <Route path="/find-teammate" element={<FindTeammate />} />
                        <Route path="/queries" element={<Queries />} />
                        <Route 
                            path="/user" 
                            element={
                            <Suspense fallback={<Typography variant="h3">🌀 Loading...</Typography>}>
                                <UserProfile />
                            </Suspense>} 
                        />
                        <Route path="/make-post" element={<MakePost />} />
                        <Route path="/activities" element={<Activities />} />
                    </Routes>
                </Box>
            )}
        </>
    );
};
    