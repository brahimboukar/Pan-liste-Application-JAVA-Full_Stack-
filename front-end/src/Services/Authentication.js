import axios from "axios"
import { ENDPOINT } from "../Constant/Constant.js";

export default class Authentication {

    static async login(email,password) {
        // eslint-disable-next-line no-useless-catch
        try{
            const response = await axios.post(`${ENDPOINT}/api/auth/login`,{email,password})
            return response.data
        } catch(err) {
            throw err;
        }
    }

    static async register(userData) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.post(`${ENDPOINT}/api/auth/register`,userData,
                )
                return response.data
        } catch (err) {
            throw err;
        }
    }

    static async getAllSexe() {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.get(`${ENDPOINT}/api/auth/sexe`)
            return response.data
           
        } catch (err) {
            throw err;
        }    
    }
    static async getAllRegion() {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.get(`${ENDPOINT}/api/auth/region`)
            return response.data
           
        } catch (err) {
            throw err;
        } 
    }
     static async getAllFonction() {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.get(`${ENDPOINT}/api/auth/fonction`)
            return response.data
           
        } catch (err) {
            throw err;
        } 
    }
    static async getAllFonctionDetailler(id) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.get(`${ENDPOINT}/api/auth/fonctionDétailler/${id}`);
            return response.data
           
        } catch (err) {
            throw err;
        } 
    }


    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthentication() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly() {
        return this.isAuthentication() && this.isAdmin();
    }
    static userOnly() {
        return this.isAuthentication() && this.isUser();
    }

}