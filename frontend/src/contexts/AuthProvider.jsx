/* eslint-disable react/prop-types */
import AuthContext from "./AuthContext";


const AuthProvider = ({ children }) => {
    
    const login = (jwtToken) => localStorage.setItem("Connekt-token", jwtToken);
    
    const logout = () => localStorage.removeItem("Connekt-token");

    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;