import React, {useEffect, useRef, useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {axiosClient} from "../../../api/axios.js";
import ToastSucces from "../../toast/ToastSucces.jsx";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const formSchema = z.object({
    libelle: z
        .string()
        .min(1, 'Le libellé est requis')
        .min(3, 'Le libellé doit contenir au moins 3 caractères'),
    description: z
        .string()
        .min(1, 'Description est requis')
        .min(3, 'Description doit contenir au moins 3 caractères'),
    dateDebut: z.string()
        .min(1, "La date Debut est requise"),
    dateFin: z.string()
        .min(1, "La date Fin est requise"),

    img: z
        .any()
        .refine(file => file instanceof File, {
            message: "L'image est requise",
        })
        .refine(file => !file || !(file instanceof File) || file.size <= MAX_FILE_SIZE, {
            message: "L'image ne doit pas dépasser 2MB",
        })
        .refine(file => !file || !(file instanceof File) || ACCEPTED_TYPES.includes(file.type), {
            message: 'Seuls les formats JPEG et PNG sont acceptés',
        }),
});
function ModalAddEvenments({getAllEvenements , onClose}) {
    const [imgFile, setImgFile]   = useState(null);
    const [preview, setPreview]   = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const fileRef = useRef();
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libelle: '',description:'', dateDebut:'' , dateFin:'' , img:null
        }
    });

    const handleFile = (file) => {
        if (!file) return;
        setImgFile(file);
        setPreview(URL.createObjectURL(file));
        form.setValue('img', file, { shouldValidate: true });
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file?.type.includes('image')) handleFile(file);
    };

    const clearFile = () => {
        setImgFile(null);
        setPreview(null);
        form.setValue('img', undefined, { shouldValidate: true });
    };
    const formatDate = (d) => d.replace(/-/g, '/');
    const onSubmit = async (values) => {
        setErrors("")
        setLoading(true);
        const fd = new FormData();
        fd.append('libelle', values.libelle);
        fd.append('description', values.description);
        fd.append('dateDebut', formatDate(values.dateDebut));
        fd.append('dateFin', formatDate(values.dateFin));
        if(imgFile) fd.append('img', imgFile);
        try{
            await axiosClient.post(`api/admin/evenement/ajouter`,fd);
            form.reset();
            setImgFile(null);
            setPreview(null);
            getAllEvenements();
            setIsSuccessOpen(true);
        } catch (error) {
            if(error.response.data.statusCode === 400 ) {
                setErrors("Cette Evénements existe déjà !");

            } else if (error.response.data.statusCode === 422) {
                setErrors(error.response.data.error);

            } else {
                setErrors("Erreur serveur");

            }
        }
        finally {
            setLoading(false);
        }
    }
    const date_Debut = form.watch("dateDebut");
    useEffect(() => {
        form.setValue("dateFin","");
    },[date_Debut]);
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-white rounded-xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto">


                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Ajouter un Evénement</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <ToastSucces isOpen={isSuccessOpen}
                              onClose={() => {setIsSuccessOpen(false);onClose(); }}
                              message="Evénemets ajoutée avec succès !"
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

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-sm text-gray-500 mb-1 block">Libellé</label>
                        <input
                            {...form.register('libelle')}
                            placeholder="Ex: Participation..."
                            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400
                            ${form.formState.errors.libelle ?    'border-red-400' : 'border-gray-200'}`}
                        />
                        {form.formState.errors.libelle && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.libelle.message}</p>
                        )}
                    </div>
                </div>
                {/* Description */}
                <div className="mb-4">
                    <label className="text-sm text-gray-500 mb-1 block">Description</label>
                    <textarea
                        {...form.register('description')}
                        rows={4}
                        placeholder="Ex: Description de évenement..."
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none
                        ${form.formState.errors.description ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {form.formState.errors.description && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>
                    )}
                </div>


                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-sm text-gray-500 mb-1 block">Date Debut</label>
                        <input
                            {...form.register('dateDebut')}
                            type="date"
                            placeholder="Date Debut"
                            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400
                            ${form.formState.errors.dateDebut ?'border-red-400' : 'border-gray-200'}`}
                        />
                        {form.formState.errors.dateDebut && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.dateDebut.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm text-gray-500 mb-1 block">Date Fin</label>
                        <input  disabled={!date_Debut}
                                {...form.register('dateFin')}
                                type="date"
                                min={date_Debut}
                                placeholder="Date Fin"
                                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400
                            ${form.formState.errors.dateFin ? 'border-red-400' : 'border-gray-200'}
                            ${!date_Debut ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                        {form.formState.errors.dateFin && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.dateFin.message}</p>
                        )}
                    </div>
                </div>


                <div className="mb-6">
                    <label className="text-sm text-gray-500 mb-1 block">Image</label>
                    {!preview ? (
                        <div
                            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileRef.current.click()}
                            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer transition
                                ${dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-400'}
                                ${form.formState.errors.img ? 'border-red-400 bg-red-50' : ''}`}
                        >
                            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            <p className="text-sm font-medium text-gray-700">Drag &amp; Drop ou choisir un fichier</p>
                            <span className="text-xs text-gray-400 uppercase tracking-wide">JPEG ou PNG</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                            <img src={preview} className="w-12 h-12 object-cover rounded-lg border border-gray-200" alt="preview" />
                            <span className="text-sm text-gray-700 flex-1">{imgFile?.name}</span>
                            <button type="button" onClick={clearFile} className="text-gray-400 hover:text-red-500">✕</button>
                        </div>
                    )}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={e => handleFile(e.target.files[0])}
                    />
                    {form.formState.errors.img && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.img.message}</p>
                    )}
                </div>


                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={onClose}
                            className="px-5 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
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

            </form>
        </div>
    );
}

export default ModalAddEvenments;