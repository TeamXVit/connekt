import { Routes, Route, useLocation } from "react-router";
import Login from "../../pages/authentication/Login";
import Signup from "../../pages/authentication/Signup";

export default function Navigator() {
    
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
        </Routes>
    )
}