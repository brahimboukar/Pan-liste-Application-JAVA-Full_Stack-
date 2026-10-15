import React, {useState} from 'react';
import {
    Calendar,
    CalendarSync,
    CircleStar,
    Coins,
    Eye,
    Gift,
    Loader,
    MoreHorizontal,
    Pencil,
    Timer,
    Trash
} from "lucide-react";
import StatusBadge from "../badge/StatusBadge.jsx";
import {format} from "date-fns";
import ModalEvenments from "../modal/affichage/ModalEvenments.jsx";
import ModalModificationEvenement from "../modal/modification/ModalModificationEvenement.jsx";
import ModalDeleteConfirmation from "../modal/confirmation/ModalDeleteConfirmation.jsx";
import {axiosClient} from "../../api/axios.js";
import ToastSucces from "../toast/ToastSucces.jsx";

function DisplayEvenements({evenements , loading , getAllEvenements}) {
    const [openModal, setOpenModal] = useState(false);
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [selectedEven, setSelectedEven] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const formatDate = (date) => {
        return format(new Date(date), "dd MMM, yyyy");
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        try {
            await axiosClient.delete(`api/admin/evenement/delete/${selectedEven.id}`);
            setIsDeleteOpen(false);
            setIsSuccessOpen(true);
            getAllEvenements();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingDelete(false);
        }
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
    if (!evenements || evenements.length === 0) {
        return (
            <tr>
                <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <CalendarSync size={32} className="text-gray-300" />
                        </div>
                        <span className="text-sm font-semibold text-gray-500">Aucun Evenement</span>
                        <span className="text-xs text-gray-400 mt-1">La liste est actuellement vide</span>
                    </div>
                </td>
            </tr>
        );
    }
    return (
        <>
            {evenements.map((r) => (
                <tr key={r.id} className="group transition-colors hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            {r.byteImg ? (
                                <img
                                    src={`data:image/jpeg;base64,${r.byteImg}`}
                                    alt={r.libelle}
                                    className="h-15 w-15 shrink-0 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                                    <Gift className="h-4 w-4" />
                                </div>
                            )}
                            <span className="text-sm font-medium text-slate-800">{r.libelle.substring(0,10)}...</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-800">{r.description.substring(0, 10)}...</span>
                        </div>
                    </td>
                    <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                      <Calendar className="h-3.5 w-3.5" />
                        {formatDate(r.dateDebut)}
                    </span>
                    </td>
                    <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                      <Calendar className="h-3.5 w-3.5" />
                        {formatDate(r.dateFin)}
                    </span>
                    </td>



                    <td className="px-4 py-4 text-sm text-slate-500">{formatDate(r.created_at)}</td>

                    <td className="px-4 py-4">
                        <div className="flex justify-end">
                            <button
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                                title="Voir" onClick={() => {setOpenModal(true) ; setSelectedEven(r)}}
                            >
                                <Eye size={15}/>
                            </button>
                            <button
                                className="p-1 text-amber-600 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                                title="Modifier" onClick={() => {setIsModalOpen(true) ; setSelectedEven(r)}}
                            >
                                <Pencil size={15}/>
                            </button>
                            <button
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                title="Supprimer" onClick={() => {setSelectedEven(r); setIsDeleteOpen(true);}}
                            >
                                <Trash size={15}/>
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            <ModalEvenments evenments = {selectedEven}
                            isOpen={openModal}
                            onClose={() => setOpenModal(false)} setIsOpen={setOpenModal}
            />
            <ModalModificationEvenement setIsOpen={setIsModalOpen}
                           getAllEvenements = {getAllEvenements}
                           isOpen={isModalOpen}
                           onClose={() => setIsModalOpen(false)}
                           evenement = {selectedEven}
            />
                <ModalDeleteConfirmation
                    loading={loadingDelete}
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete}
                />
                <ToastSucces
                    isOpen={isSuccessOpen}
                    onClose={() => { setIsSuccessOpen(false); onClose(); }}
                    message="Evénement supprimée avec succès !"
                />
        </>
    );
}

export default DisplayEvenements;