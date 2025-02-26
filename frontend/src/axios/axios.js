import axios from "axios";
import Backend from "../constants/Backend";
import BearerHeader from "../constants/BearerHeader";

const instance = axios.create({
    baseURL: Backend
});

instance.defaults.headers.common["Authorization"] = BearerHeader;

export default instance;