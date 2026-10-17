import React, {useEffect, useState} from 'react';
import {Briefcase, Calendar, Lock, Mail, MapPin, Phone, User, Users, X} from "lucide-react";
import {axiosClient} from "../../../api/axios.js";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ToastSucces from "../../toast/ToastSucces.jsx";
const formSchema = z.object({
    nom: z.string()
        .min(1, 'Le nom est requis')
        .min(3, 'Le nom doit contenir au moins 3 caractères'),
    prenom: z.string()
        .min(1, 'Le prenom est requis')
        .min(3, 'Le prenom doit contenir au moins 3 caractères'),
    email : z.string().email("Email invalide")
        .min(2)
        .max(30),
    password : z.string()
        .min(8,"\"Minimum 8 caractères\"")
        .max(30),
    telephone: z
        .string()
        .trim()
        .regex(
            /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            "Veuillez entrer un numéro de téléphone français valide (ex: 06 12 34 56 78)"
        ),
    date_Naissance: z.string()
        .min(1, "La date de naissance est requise")
        .refine((val) => {
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, "Date invalide")
        .refine((val) => {
            return new Date(val) <= new Date();
        }, "La date ne peut pas être dans le futur")
        .refine((val) => {
            const naissance = new Date(val);
            const aujourd_hui = new Date();
            let age = aujourd_hui.getFullYear() - naissance.getFullYear();
            const m = aujourd_hui.getMonth() - naissance.getMonth();
            if (m < 0 || (m === 0 && aujourd_hui.getDate() < naissance.getDate())) age--;
            return age >= 18;
        }, "Vous devez avoir au moins 18 ans"),
    id_sexe: z.coerce
        .number()
        .int()
        .positive("Veuillez sélectionner sexe"),
    id_region: z.coerce
        .number()
        .int()
        .positive("Veuillez sélectionner region"),
    id_fonction: z.coerce
        .number()
        .int()
        .positive("Veuillez sélectionner une fonction"),
    id_fonction_details: z.coerce.number().min(1, "Veuillez sélectionner une fonction Détailler"),
})
function ModalAddPaneliste({ getAllPaneliste,onClose }) {
    const [sexes, setSexes] = useState([]);
    const [regions, setRegions] = useState([]);
    const [fonction, setFonction] = useState([]);
    const [fonctionDetailler, setFonctionDetailler] = useState([]);
    const [error, setError] = useState([]);
    const [errorCreate, setErrorCreate] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [selectedFonctionDetail, setSelectedFonctionDetail] = useState('');
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "", nom:"" , prenom: "", password:"",
            telephone: "", date_Naissance: "",
            id_sexe:"" , id_region:"" , id_fonction:""
        }
    });
    //const selectFonction = form.watch("id_fonction");

    const getAllSexes = async () => {
        try {
            const res = await axiosClient.get('api/admin/panélistes/sexes');
            setSexes(res.data.data);
        }
        catch (err) {
            setError(err.response.data.error)
        }
    }

    const getAllRegion = async () => {
        try {
            const res = await axiosClient.get('api/admin/panélistes/region');
            setRegions(res.data.data);
        }
        catch (err) {
            setError(err.response.data.error)
        }
    }
    /*
    const getAllFonction = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axiosClient.get('api/admin/users/getAllFonctions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setFonction(res.data.data);
        }
        catch (err) {
            setError(err.response.data.error)
        }
    }
    const getAllFonctionDetailler = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axiosClient.get(`api/admin/users/getAllFonctionsDetailler/${Number(selectFonction)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setFonctionDetailler(res.data.data);
        }
        catch (err) {
            setError(err.response.data.error)
        }
    }
    */
    useEffect(() => {
        getAllSexes();
        getAllRegion();
        /*getAllFonction();*/
    },[]);
    /*
    useEffect(() => {
        if (selectFonction) {
            getAllFonctionDetailler();
            setSelectedFonctionDetail('');
            form.setValue("id_fonction_details", null);
        }
    }, [selectFonction]);*/


    /*const onSubmit = async (values) => {
        setErrorCreate("");
        setLoading(true)
        try{
            const token = localStorage.getItem("token");
            const res = await axiosClient.post('api/admin/users/createUsers', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            form.reset()
            setIsSuccessOpen(true);
            getAllPaneliste()
        } catch (err) {
            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                const firstError = Object.values(errors)[0][0];
                setErrorCreate(firstError);
            } else {
                setErrorCreate("Erreur serveur");
            }
        } finally {
            setLoading(false)
        }
    }*/

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-slideUp">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="text-white" size={24} />
                    </button>
                    <ToastSucces isOpen={isSuccessOpen}
                                  onClose={() => {setIsSuccessOpen(false);onClose(); }}
                                  message="Panéliste ajoutée avec succès !"
                    />
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <Users className="text-white" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Ajouter Nouveau Panéliste</h2>
                            <p className="text-blue-100 text-sm">Remplissez les informations ci-dessous</p>
                        </div>
                    </div>
                </div>
                <form >
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                        {errorCreate && (
                            <div className="mb-4 px-3.5 py-2.5 bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 rounded-lg flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}>
                                    <circle cx="8" cy="8" r="7" fill="#ef4444"/>
                                    <path d="M8 4v4M8 10v1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                                <p className="text-sm text-red-600 dark:text-red-400">{errorCreate}</p>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User size={16} className="text-blue-600" />
                                    Nom
                                </label>
                                <input {...form.register('nom')}
                                       type="text" placeholder="Entrez le nom"
                                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {form.formState.errors.nom && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.nom.message}</p>
                                )}
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User size={16} className="text-blue-600" />
                                    Prénom
                                </label>
                                <input {...form.register('prenom')}
                                       type="text"
                                       placeholder="Entrez le prénom"
                                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {form.formState.errors.prenom && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.prenom.message}</p>
                                )}
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Mail size={16} className="text-blue-600" />
                                    Email
                                </label>
                                <input {...form.register('email')}
                                       type="email"
                                       placeholder="exemple@email.com"
                                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {form.formState.errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                                )}
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Phone size={16} className="text-blue-600" />
                                    Téléphone
                                </label>
                                <input {...form.register('telephone')}
                                       type="tel"
                                       placeholder="+212 6XX XXX XXX"
                                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {form.formState.errors.telephone && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.telephone.message}</p>
                                )}
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Lock size={16} className="text-blue-600" />
                                    Mot de passe
                                </label>
                                <input {...form.register('password')}
                                       type="password"
                                       placeholder="••••••••"
                                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {form.formState.errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
                                )}
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-600" />
                                    Date de naissance
                                </label>
                                <input {...form.register('date_Naissance')}
                                       type="date"
                                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {form.formState.errors.date_Naissance && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.date_Naissance.message}</p>
                                )}
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Users size={16} className="text-blue-600" />
                                    Sexe
                                </label>
                                <select defaultValue={''} {...form.register('id_sexe')}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors bg-white"
                                >
                                    <option value="" disabled>Sélectionnez le sexe</option>
                                    {
                                        sexes.map((sex) => {
                                            return  <option key={sex.id} value={sex.id}>{sex.libelle}</option>
                                        })
                                    }
                                </select>
                                {form.formState.errors.id_sexe && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.id_sexe.message}</p>
                                )}
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-600" />
                                    Région
                                </label>
                                <select defaultValue={''} {...form.register('id_region')}

                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors bg-white"
                                >
                                    <option value="" disabled>Sélectionnez la région</option>
                                    {
                                        regions.map((reg) => {
                                            return  <option key={reg.id} value={reg.id}>{reg.libelle}</option>
                                        })
                                    }
                                </select>
                                {form.formState.errors.id_region && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.id_region.message}</p>
                                )}
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Briefcase size={16} className="text-blue-600" />
                                    Fonction
                                </label>
                                <select defaultValue={''} {...form.register('id_fonction')}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors bg-white"
                                >
                                    <option value=""  disabled defaultValue={''}>Sélectionnez la fonction</option>
                                    {
                                        fonction.map((fonc) => {
                                            return  <option key={fonc.id} value={fonc.id}>{fonc.libelle}</option>
                                        })
                                    }
                                </select>
                                {form.formState.errors.id_fonction && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.id_fonction.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Briefcase size={16} className="text-blue-600" />
                                    Fonction Détaillée
                                </label>
                                <select
                                    {...form.register('id_fonction_details')}
                                    value={selectedFonctionDetail}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedFonctionDetail(value);
                                        form.setValue("id_fonction_details", value ? Number(value) : null);
                                    }}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                                >
                                    <option value="" disabled defaultValue={''}>Sélectionnez</option>

                                    {fonctionDetailler.map((foncD) => (
                                        <option key={foncD.id} value={foncD.id}>
                                            {foncD.libelle}
                                        </option>
                                    ))}
                                </select>
                                {form.formState.errors.id_fonction_details && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.id_fonction_details.message}</p>
                                )}
                            </div>

                        </div>



                    </div>
                    <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                            >

                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    </>
                                ) : (
                                    'Ajouter'
                                )}
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default ModalAddPaneliste;