import { Routes, Route, useLocation, Navigate } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";


export default function RouteProvider() {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    
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
            default:
                document.title = "Connekt"
        }
    }, [location])

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/"/>}/>
            <Route path="/signup" element={<Signup />}/>
        </Routes>
    )
}