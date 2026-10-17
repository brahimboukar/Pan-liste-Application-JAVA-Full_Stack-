import React, {useState} from 'react';
import {CircleStar, Loader, Pencil, Trash2} from "lucide-react";
import {format} from "date-fns";
import {axiosClient} from "../../api/axios.js";
import ModalDeleteConfirmation from "../modal/confirmation/ModalDeleteConfirmation.jsx";
import ToastSucces from "../toast/ToastSucces.jsx";
import ModalErreur from "../modal/erreur/ModalErreur.jsx";
import ModalModificationCatEtude from "../modal/modification/ModalModificationCatEtude.jsx";

function DisplayCatEtude({categorieEtude ,loading , getAllCategorie, currentPage}) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errors, setErrors] = useState('');
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isModalOpen , setIsModalOpen] = useState(false);

    const formatDate = (date) => {
        return format(new Date(date), "dd MMM, yyyy");
    };
    const handleDelete = async () => {
        setErrors('')
        setLoadingDelete(true);
        try {
            await axiosClient.delete(`api/admin/categorieEtude/delete/${selectedCat.id}`);
            const newPage = categorieEtude.length === 1 && currentPage > 0
                ? currentPage - 1 : 0;
            setIsDeleteOpen(false);
            setIsSuccessOpen(true);
            getAllCategorie(newPage);
        } catch (err) {
            if(err.response.data.statusCode === 409) {
                setErrors(err.response.data.error );
                setIsDeleteOpen(false);
                setIsErrorOpen(true);
            } else if (err.response.data.statusCode === 404) {
                setErrors(err.response.data.error );
                setIsDeleteOpen(false);
                setIsErrorOpen(true);
            } else if (err.response.data.statusCode === 500) {
                setErrors(err.response.data.error );
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
    if (!categorieEtude || categorieEtude.length === 0) {
        return (
            <tr>
                <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <CircleStar size={32} className="text-gray-300" />
                        </div>
                        <span className="text-sm font-semibold text-gray-500">Aucun Récomponse</span>
                        <span className="text-xs text-gray-400 mt-1">La liste est actuellement vide</span>
                    </div>
                </td>
            </tr>
        );
    }
    return (
        <>
            {categorieEtude.map((item) => (
                <tr
                    key={item.id}
                    className="border-b last:border-b-0 border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{item.libelle}</td>
                    <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                            {formatDate(item.createdAt)}
                        </span>
                    </td>
                    <td className="px-4 py-4">
                        <div className="flex justify-end">
                        <button
                            className="p-1 text-amber-600 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                            title="Modifier" onClick={() => {setIsModalOpen(true) ; setSelectedCat(item)}}
                        >
                            <Pencil size={15}/>
                        </button>
                        <button
                            title="Supprimer"
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            onClick={() => {setSelectedCat(item) ; setIsDeleteOpen(true) }}
                        >
                            <Trash2 size={15} />
                        </button>
                        </div>
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
            <ModalModificationCatEtude
                setIsOpen={setIsModalOpen}
                getAllCategorie={getAllCategorie}
                currentPage={currentPage}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cat={selectedCat}
            />
        </>
    );
}

export default DisplayCatEtude;