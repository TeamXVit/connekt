/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";


const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const login = (token) => {
        setIsAuthenticated(true);
        localStorage.setItem("Connekt-token", token)
    };
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("Connekt-token");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;