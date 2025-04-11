import axios from "axios";
import Backend from "../constants/Backend";
import BearerHeader from "../constants/BearerHeader";

const instance = axios.create({
    baseURL: Backend
});

instance.defaults.headers.common["Authorization"] = BearerHeader;

// Checks if the jwt token has expired and redirects to login page if expired
instance.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.data.message === "Invalid or Expired Token") {
            console.warn("Token expired. Logging out...");
            localStorage.removeItem("Connekt-token"); 
            window.location.href = "/login"; 
        }
        return Promise.reject(error);
    }
);

export default instance;