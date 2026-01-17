import axios from "axios";
import { ENDPOINT } from "../Constant/Constant";

export default class Header {

    static async currentUser() {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(`${ENDPOINT}/api/admin/currentUser`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                 }
            });
            return response.data;
            
        } catch (error) {
            console.error("Erreur:", error);
            return 0
        }
    }
}