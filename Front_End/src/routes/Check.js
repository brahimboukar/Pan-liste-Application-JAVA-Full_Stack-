import {getRole,isTokenExpired} from "../utils/jwt.js";


export default class Check {
    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token && !isTokenExpired();
    }

    static getRole() {
        return getRole();
    }

    static isAdmin() {
        const role = this.getRole();
        return role === 'ROLE_ADMIN' || role === 'ADMIN';
    }

    static isUser() {
        const role = this.getRole();
        return role === 'ROLE_USER' || role === 'USER';
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }

    static userOnly() {
        return this.isAuthenticated() && this.isUser();
    }

    static logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
}