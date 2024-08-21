//Axios
import axios, { AxiosRequestConfig } from "axios";

//Shared
import { url } from "./shared/const";


//Axios config
const config: AxiosRequestConfig = {
    baseURL: url,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
}


/** 
 * api
 * 
 * axios HTTP kérés létrehozása a megadott konfigurációval
*/
const api = axios.create(config);

export default api;