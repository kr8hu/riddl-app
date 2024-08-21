//Axios
import { AxiosResponse } from "axios";
import api from "../http-common";

//Interfaces
import IServiceResponse from "../interfaces/ServiceResponse";


/**
 * CategoryService
 * 
 * Kategória adatokkal kapcsolatos HTTP kéréseket kezelő service
 */
class CategoryService {

    controller = "categories";

    /**
     * Create
     * 
     * Létrehoz egy új kategóriát.
     * 
     * @param data - A kategória adatait tartalmazó objektum.
     * @returns - Az újonnan létrehozott kategória adatai.
     */
    async create(data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/create`;
        const response: AxiosResponse<any, any> = await api.post(url, data);

        return response.data;
    }

    /**
     * findAll
     * 
     * Visszaadja az összes kategóriát.
     * 
     * @returns - Az összes kategória adatai.
     */
    async findAll(): Promise<IServiceResponse> {
        const url: string = this.controller;
        const response: AxiosResponse<any, any> = await api.post(url);

        return response.data;
    }

    /**
     * findById
     * 
     * Azonosító alapján keres egy kategóriát.
     * 
     * @param id - A keresett kategória azonosítója.
     * @returns - A keresett kategória adatai.
     */
    async findById(id: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/find/id/${id}`;
        const response: AxiosResponse<any, any> = await api.get(url);

        return response.data;
    }

    /**
     * findByName
     * 
     * Kategórianév alapján keres egy kategóriát.
     * 
     * @param username - A keresett kategória neve.
     * @returns - A keresett kategória adatai.
     */
    async findByName(username: string): Promise<IServiceResponse> {
        const url: string = `${this.controller}/find/name/${username}`;
        const response: AxiosResponse<any, any> = await api.get(url);

        return response.data;
    }

    /**
     * Update
     * 
     * Frissít egy meglévő kategóriát.
     * 
     * @param id - A frissítendő kategória azonosítója.
     * @param data - A frissített kategória adatait tartalmazó objektum.
     * @returns - A frissített kategória adatai.
     */
    async update(id: any, data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/update/${id}`;
        const response: AxiosResponse<any, any> = await api.put(url, data);

        return response.data;
    }

    /**
     * Remove
     * 
     * Töröl egy kategóriát azonosító alapján.
     * 
     * @param id - A törlendő kategória azonosítója.
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
     * @returns - Az összes kategória törlésének eredménye.
     */
    async removeAll(): Promise<IServiceResponse> {
        const url: string = `${this.controller}/remove`;
        const response: AxiosResponse<any, any> = await api.delete(url);

        return response.data;
    }
}

//eslint-disable-next-line
export default new CategoryService();
