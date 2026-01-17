import axios from "axios"
import { ENDPOINT } from "../Constant/Constant"

export default class Dashboard {

    static async nbrPanéliste() {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(`${ENDPOINT}/api/admin/nbrPaneliste`, {
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

    static async nbrRécomponse() {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(`${ENDPOINT}/api/admin/recomponse/nbrRecomponse`, {
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

    static async nbrEtude() {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(`${ENDPOINT}/api/admin/etude/nbrEtude`, {
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

    static async nbrEvenement() {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(`${ENDPOINT}/api/admin/evenement/nbrEvenement`, {
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