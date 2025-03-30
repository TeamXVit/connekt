/* eslint-disable react/prop-types */
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router";
import Landing from "../pages/user/Landing";
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
import Anonymous from "../pages/features/Anonymous";
import FAQ from "../pages/user/FAQ";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const TravelPartner = lazy(() => import("../pages/features/TravelPartner"));

export default function RouteProvider({ toggleTheme }) {
    const location = useLocation();
    
    const token = localStorage.getItem("Connekt-token");
    
    const hiddenRoutes = ["/login", "/signup", "/forgot-password"];
    const isAuthPage = hiddenRoutes.includes(location.pathname)

    useEffect(() => {
        const titles = {
            "/": "Connekt",
            "/login": "Login",
            "/signup": "Signup",
            "/forgot-password": "Reset Password",
            "/travel": "Travel Partner",
            "/lostandfound": "Lost & Found",
            "/teammate": "Find A Teammate",
            "/queries": "Queries",
            "/anonymous": "Anonymous confessions",
            "/user": "User Profile",
            "/make-post": "Make A Post",
            "/activities": "My Activities",
        };
        document.title = titles[location.pathname] || "Connekt";
    }, [location]);

    if (token && location.pathname === "/") {
        return <Navigate to="/travel" replace/>
    };
    
    // Fixed token expiration issue
    if (!token && ["/travel", "/lostandfound", "/teammate", "/queries", "/anonymous", "/user", "/make-post", "/activities"].includes(location.pathname)) {
        return <Navigate to="/login" replace/>
    }

    return (  
        <>
            {isAuthPage ? (
                <Routes>
                    <Route path="/login" element={!token ? <Login /> : <Navigate to="/travel" />} />
                    <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/travel" />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            ) : (
                <Box sx={{ display: "flex" }}>
                    <TopBar toggle={toggleTheme}/>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Landing />}/>
                        <Route 
                            path="/travel" 
                            element={token ? 
                            <Suspense fallback={<CircularProgress />}>
                                <TravelPartner />
                            </Suspense> : 
                            <Navigate to="/login" />} 
                        />
                        <Route path="/teammate" element={<FindTeammate />} />
                        <Route path="/lostandfound" element={<LostFound />} />
                        <Route path="/queries" element={<Queries />} />
                        <Route path="/anonymous" element={<Anonymous />}/>
                        <Route 
                            path="/user" 
                            element={
                            <Suspense fallback={<CircularProgress />}>
                                <UserProfile />
                            </Suspense>} 
                        />
                        <Route path="/make-post" element={<MakePost />} />
                        <Route path="/activities" element={<Activities />} />
                        <Route path="/faq" element={<FAQ />}/>
                    </Routes>
                </Box>
            )}
        </>
    );
};
    