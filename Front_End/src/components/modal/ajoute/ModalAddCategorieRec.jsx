import {useState} from 'react';
import {XCircle} from "lucide-react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {axiosClient} from "../../../api/axios.js";
import ToastSucces from "../../toast/ToastSucces.jsx";

const formSchema = z.object({
    libelle : z.string().min(1, 'Le libellé est requis')
        .min(3, 'Le libellé doit contenir au moins 3 caractères'),
})
function ModalAddCategorieRec({isOpen , onClose,getAllCat}) {
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const form = useForm({
        resolver : zodResolver(formSchema),
        defaultValues : {
            libelle : "",
        }
    });
    if (!isOpen) return null;
    const onSubmit = async (values) => {
        setErrors("")
        setLoading(true);
        try {
            await axiosClient.post('api/admin/categorieRecomponse/createCategorieRecomponse',values);
            form.reset();
            getAllCat();
            setIsSuccessOpen(true)
        } catch (error) {

            if(error.response.data.statusCode === 400) {
                setErrors(error.response.data.error);
                console.log(error);
            } else if(error.response.data.statusCode === 422) {
                setErrors(error.response.data.error);
                console.log(error);
            } else {
                setErrors(error.response.data.error);
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl w-full max-w-md p-6">


                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            Ajouter une catégorie
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                            <XCircle size={16} className="text-gray-500" />
                        </button>
                    </div>
                    <ToastSucces isOpen={isSuccessOpen} onClose={() => {
                        setIsSuccessOpen(false);
                        onClose()
                    }} message="Catégorie ajoutée avec succès !"
                    />
                    {errors && (
                        <div className="mb-4 px-3.5 py-2.5 bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 rounded-lg flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}>
                                <circle cx="8" cy="8" r="7" fill="#ef4444"/>
                                <path d="M8 4v4M8 10v1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <p className="text-sm text-red-600 dark:text-red-400">{errors}</p>
                        </div>
                    )}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-500 mb-1.5">Libellé</label>
                        <input {...form.register('libelle' )}
                               type="text"
                               id="libelle"
                               name="libelle"
                               placeholder="Ex: Électronique"
                               className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                        />

                        {form.formState.errors.libelle && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.libelle.message}
                            </p>
                        )}
                    </div>


                    <div className="flex gap-2.5 justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium border border-gray-200 dark:border-neutral-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </>
                            ) : (
                                'Enregistrer'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>

    );
}

export default ModalAddCategorieRec;