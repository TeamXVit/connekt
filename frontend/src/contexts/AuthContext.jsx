/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const login = (jwtToken) => {
        localStorage.setItem("Connekt-token", jwtToken);
    };
    
    const logout = () => {
        localStorage.removeItem("Connekt-token");
    };

    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};