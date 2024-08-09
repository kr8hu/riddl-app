//Axios
import axios from "axios";

//Shared
import { url } from "./shared/const";

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000
});

export default api;