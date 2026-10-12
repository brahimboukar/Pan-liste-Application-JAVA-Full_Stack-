import React, {useState} from 'react';
import {CircleStar, Layers, Loader, Trash2} from "lucide-react";
import {format} from "date-fns";
import ModalDeleteConfirmation from "../modal/confirmation/ModalDeleteConfirmation.jsx";
import {axiosClient} from "../../api/axios.js";
import ToastSucces from "../toast/ToastSucces.jsx";
import ModalErreur from "../modal/erreur/ModalErreur.jsx";

function DisplayCatRec({categorieRec, loading, getAllCategorie, currentPage}) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errors, setErrors] = useState('');
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);

    const formatDate = (date) => {
        return format(new Date(date), "dd MMM, yyyy");
    };

    const handleDelete = async () => {
        setErrors('')
        setLoadingDelete(true);
        try {
            await axiosClient.delete(`api/admin/categorieRecomponse/deleteCategorie/${selectedCat.id}`);
            const newPage = categorieRec.length === 1 && currentPage > 0
                ? currentPage - 1 : 0;
            setIsDeleteOpen(false);
            setIsSuccessOpen(true);
            getAllCategorie(newPage);
        } catch (er) {
            if(er.response.data.statusCode === 409) {
                setErrors(er.response.data.error );
                setIsDeleteOpen(false);
                setIsErrorOpen(true);
            } else if (er.response.data.statusCode === 404) {
                setErrors(er.response.data.error );
                setIsDeleteOpen(false);
                setIsErrorOpen(true);
            } else if (er.response.data.statusCode === 500) {
                setErrors(er.response.data.error );
                setIsDeleteOpen(false);
                setIsErrorOpen(true);
            }
        } finally {
            setLoadingDelete(false);
        }
    }

    const handleSuccessClose = () => {
        setIsSuccessOpen(false);
    }

    if (loading) {
        return (
            <tr>
                <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <Loader size={40} className="text-indigo-500 animate-spin mb-4" />
                        <span className="text-sm font-medium text-gray-500">Chargement des données...</span>
                    </div>
                </td>
            </tr>
        );
    }
    if (!categorieRec || categorieRec.length === 0) {
        return (
            <tr>
                <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <Layers size={32} className="text-gray-300" />
                        </div>
                        <span className="text-sm font-semibold text-gray-500">Aucun Catégorie Récomponse</span>
                        <span className="text-xs text-gray-400 mt-1">La liste est actuellement vide</span>
                    </div>
                </td>
            </tr>
        );
    }
    return (
        <>
            {categorieRec.map((item) => (
                <tr
                    key={item.id}
                    className="border-b last:border-b-0 border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                    <td className="py-3 px-4 text-sm font-medium text-violet-600">{item.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{item.libelle}</td>
                    <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                            {formatDate(item.createdAt)}
                        </span>
                    </td>
                    <td className="py-3 px-4">
                        <button
                            title="Supprimer"
                            className="p-1.5 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors"
                            onClick={() => { setSelectedCat(item); setIsDeleteOpen(true) }}
                        >
                            <Trash2 size={14} />
                        </button>
                    </td>
                </tr>
            ))}
            <ModalDeleteConfirmation
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                loading={loadingDelete}
            />
            <ToastSucces
                isOpen={isSuccessOpen}
                onClose={handleSuccessClose}
                message="Catégorie supprimée avec succès !"
            />
            <ModalErreur
                isOpen={isErrorOpen}
                onClose={() => setIsErrorOpen(false)}
                message={errors}
                bigmessage="Impossible de supprimer !!"
            />
        </>
    );
}

export default DisplayCatRec;