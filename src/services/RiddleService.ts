//Axios
import { AxiosResponse } from "axios";
import api from "../http-common";

//Interfaces
import IServiceResponse from "../interfaces/ServiceResponse";


/**
 * RiddleService
 * 
 * Rejtvény adatokkal kapcsolatos HTTP kéréseket kezelő service
 */
class RiddleService {

    controller = "riddles";

    /**
     * Create
     * 
     * Létrehoz egy új rejtvényt.
     * 
     * @param data - A rejtvény adatait tartalmazó objektum.
     * @returns - Az újonnan létrehozott rejtvény adatai.
     */
    async create(data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/create`;
        const response: AxiosResponse<any, any> = await api.post(url, data);

        return response.data;
    }



    /**
     * findAll
     * 
     * Visszaadja az összes rejtvényt.
     * 
     * @returns - Az összes rejtvény adatai.
     */
    async findAll(): Promise<IServiceResponse> {
        const url: string = this.controller;
        const response: AxiosResponse<any, any> = await api.post(url);

        return response.data;
    }

    /**
     * findById
     * 
     * Azonosító alapján keres egy rejtvényt.
     * 
     * @param id - A keresett rejtvény azonosítója.
     * @returns - A keresett rejtvény adatai.
     */
    async findById(id: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/find/id/${id}`;
        const response: AxiosResponse<any, any> = await api.get(url);

        return response.data;
    }

    /**
     * findByName
     * 
     * Rejtvény neve alapján keres egy rejtvényt.
     * 
     * @param username - A keresett rejtvény neve.
     * @returns - A keresett rejtvény adatai.
     */
    async findByName(username: string): Promise<IServiceResponse> {
        const url: string = `${this.controller}/find/username/${username}`;
        const response: AxiosResponse<any, any> = await api.get(url);

        return response.data;
    }

    /**
     * findByQuery
     * 
     * @param data 
     * @returns 
     */
    async findByQuery(data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/find/query`;
        const response: AxiosResponse<any, any> = await api.post(url, data);

        return response.data;
    }

    /**
     * Update
     * 
     * Frissít egy meglévő rejtvényt.
     * 
     * @param id - A frissítendő rejtvény azonosítója.
     * @param data - A frissített rejtvény adatait tartalmazó objektum.
     * @returns - A frissített rejtvény adatai.
     */
    async update(id: any, data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/update/${id}`;
        const response: AxiosResponse<any, any> = await api.put(url, data);

        return response.data;
    }

    /**
     * Remove
     * 
     * Töröl egy rejtvényt azonosító alapján.
     * 
     * @param id - A törlendő rejtvény azonosítója.
     * @returns - A törlés eredménye.
     */
    async remove(id: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/remove/${id}`;
        const response: AxiosResponse<any, any> = await api.delete(url);

        return response.data;
    }

    /**
     * RemoveAll
     * 
     * @returns - Az összes rejtvény törlésének eredménye.
     */
    async removeAll(): Promise<IServiceResponse> {
        const url: string = `${this.controller}/remove`;
        const response: AxiosResponse<any, any> = await api.delete(url);

        return response.data;
    }

    /**
     * Validation
     * 
     */
    async validation(data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/validation`;
        const response: AxiosResponse<any, any> = await api.post(url, data);

        return response.data;
    }
}

//eslint-disable-next-line
export default new RiddleService();
