//Axios
import { AxiosResponse } from "axios";
import api from "../http-common";

//Interfaces
import IServiceResponse from "../interfaces/ServiceResponse";


/**
 * ConfigurationService
 * 
 * Konfigurációs adatokkal kapcsolatos HTTP kéréseket kezelő service
 */
class ConfigurationService {

    controller = "configurations";


    /**
     * findByQuery
     * 
     */
    async findByQuery(data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/find/query`;
        const response: AxiosResponse<any, any> = await api.post(url, data);

        return response.data;
    }

    /**
     * Update
     * 
     */
    async update(data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/update`;
        const response: AxiosResponse<any, any> = await api.put(url, data);

        return response.data;
    }
}

//eslint-disable-next-line
export default new ConfigurationService();
