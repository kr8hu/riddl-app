//Axios
import { AxiosResponse } from "axios";
import api from "../http-common";

//Interfaces
import IServiceResponse from "../interfaces/ServiceResponse";


/**
 * UserService
 * 
 * Felhasználói adatokkal kapcsolatos HTTP kéréseket kezelő service
 */
class UserService {

    controller = "users";

    /**
     * Create
     * 
     * Létrehoz egy új felhasználót.
     * 
     * @param data - A felhasználó adatait tartalmazó objektum.
     * @returns - Az újonnan létrehozott felhasználó adatai.
     */
    async create(data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/create`;
        const response: AxiosResponse<any, any> = await api.post(url, data);

        return response.data;
    }

    /**
     * findAll
     * 
     * Visszaadja az összes felhasználót.
     * 
     * @returns - Az összes felhasználó adatai.
     */
    async findAll(): Promise<IServiceResponse> {
        const url: string = this.controller;
        const response: AxiosResponse<any, any> = await api.post(url);

        return response.data;
    }

    /**
     * findById
     * 
     * Azonosító alapján keres egy felhasználót.
     * 
     * @param id - A keresett felhasználó azonosítója.
     * @returns - A keresett felhasználó adatai.
     */
    async findById(id: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/find/id/${id}`;
        const response: AxiosResponse<any, any> = await api.get(url);

        return response.data;
    }

    /**
     * findByUsername
     * 
     * Felhasználónév alapján keres egy felhasználót.
     * 
     * @param username - A keresett felhasználó neve.
     * @returns - A keresett felhasználó adatai.
     */
    async findByUsername(username: string): Promise<IServiceResponse> {
        const url: string = `${this.controller}/find/username/${username}`;
        const response: AxiosResponse<any, any> = await api.get(url);

        return response.data;
    }

    /**
     * Update
     * 
     * Frissít egy meglévő felhasználót.
     * 
     * @param id - A frissítendő felhasználó azonosítója.
     * @param data - A frissített felhasználó adatait tartalmazó objektum.
     * @returns - A frissített felhasználó adatai.
     */
    async update(id: any, data: any): Promise<IServiceResponse> {
        const url: string = `${this.controller}/update/${id}`;
        const response: AxiosResponse<any, any> = await api.put(url, data);

        return response.data;
    }

    /**
     * Remove
     * 
     * Töröl egy felhasználót azonosító alapján.
     * 
     * @param id - A törlendő felhasználó azonosítója.
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
     * @returns - Az összes felhasználó törlésének eredménye.
     */
    async removeAll(): Promise<IServiceResponse> {
        const url: string = `${this.controller}/remove`;
        const response: AxiosResponse<any, any> = await api.delete(url);

        return response.data;
    }
}

//eslint-disable-next-line
export default new UserService();
