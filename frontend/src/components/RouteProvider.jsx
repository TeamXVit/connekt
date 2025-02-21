import { Routes, Route, useLocation, Navigate } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useEffect } from "react";

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
            default:
                document.title = "Connekt"
        }
    }, [location])

    return (
        <Routes>
            <Route path="/" element={token ? <Home /> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/"/>}/>
            <Route path="/signup" element={<Signup />}/>
        </Routes>
    )
}