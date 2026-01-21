import axios from "axios";
import { ENDPOINT } from "../Constant/Constant";

export default class Paneliste {

    static async getAllUsers() {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(`${ENDPOINT}/api/admin/panélistes`, {
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