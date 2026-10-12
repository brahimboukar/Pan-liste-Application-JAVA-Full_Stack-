import React, {useState} from 'react';
import {format} from "date-fns";
import {axiosClient} from "../../api/axios.js";
import {CircleStar, Coins, Eye, Gift, Loader, Timer, Trash} from "lucide-react";
import ModalDeleteConfirmation from "../modal/confirmation/ModalDeleteConfirmation.jsx";
import ToastSucces from "../toast/ToastSucces.jsx";
import ModalEtudes from "../modal/affichage/ModalEtudes.jsx";

function DisplayEtudeCible({etudeCible , getAllEtudeCible , loading}) {
   /* const [openModal, setOpenModal] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);*/
    /*const [selectedEtu, setSelectedEtu] = useState(null);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);*/

    const formatDate = (date) => {
        return format(new Date(date), "dd MMM, yyyy");
    };
    /*const handleDelete = async () => {
        setLoadingDelete(true);
        try {
            await axiosClient.delete(`api/admin/etude/delete/${selectedEtu.id}`);
            setIsDeleteOpen(false);
            setIsSuccessOpen(true);
            getAllEtudes();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingDelete(false);
        }
    }*/

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
    if (!etudeCible || etudeCible.length === 0) {
        return (
            <tr>
                <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <CircleStar size={32} className="text-gray-300" />
                        </div>
                        <span className="text-sm font-semibold text-gray-500">Aucun Etude Cible </span>
                        <span className="text-xs text-gray-400 mt-1">La liste est actuellement vide</span>
                    </div>
                </td>
            </tr>
        );
    }
    return (
        <>
            {etudeCible.map((r) => (
                <tr key={r.id} className="group transition-colors hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                            <span className="text-sm font-medium text-slate-800">{r.libelle}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                            <span className="text-sm font-medium text-slate-800">{r.ages[0].libelle}</span>
                        </div>
                    </td>
                    <td className="px-4 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                     {r.sexes[0].libelle}
                    </span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-800">{r.regions[0].libelle.substring(0, 13)}...</span>
                        </div>
                    </td>
                    <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-800">
                        {r.fonctions[0].libelle.substring(0, 8)}...
                    </span>
                    </td>
                    <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-800">
                       {r.fonctionDeteillers[0].libelle.substring(0, 8)}...
                    </span>
                    </td>



                    <td className="px-4 py-4 text-sm text-slate-500">{formatDate(r.created_at)}</td>

                    <td className="py-4  border-r border-gray-200">
                        <div className="flex items-center gap-0 justify-start">
                            {/*<button
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                                title="Voir" onClick={() => {setOpenModal(true) ; setSelectedEtu(r)}}
                            >
                                <Eye size={15}/>
                            </button>*/}
                            {/*<button
                                className="p-1 text-amber-600 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                                title="Modifier" onClick={() => {setIsModalOpen(true) ; setSelectedReco(r)}}
                            >
                                <Pencil size={15}/>
                            </button>*/}

                            {/*
                            <ModalRecomponses recomponse = {selectedReco} isOpen={openModal} onClose={() => setOpenModal(false)} setIsOpen={setOpenModal} />
*/}
                            {/*<ModalModificationReco
                                setIsOpen={setIsModalOpen}
                                getAllRecomponses = {getAllRecomponse}
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                recomponse = {selectedReco}
                                cat = {cat}
                            />*/}
                            {/*<ModalDeleteConfirmation
                                loading={loadingDelete}
                                isOpen={isDeleteOpen}
                                onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete}
                            />*/}
                            {/*<ToastSucces
                                isOpen={isSuccessOpen}
                                onClose={() => { setIsSuccessOpen(false); onClose(); }}
                                message="Etude supprimée avec succès !"
                            />*/}
                            {/*<ModalDeleteConfirmation
                                loading={loadingDelete}
                                isOpen={isDeleteOpen}
                                onClose={() => setIsDeleteOpen(false)}
                            />
                            <button
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                title="Supprimer" onClick={() => {setSelectedEtu(r); setIsDeleteOpen(true);}}
                            >
                                <Trash size={15}/>
                            </button>*/}
                        </div>
                    </td>
                </tr>
            ))}
           {/* <ModalEtudes etude={selectedEtu}
                         isOpen={openModal}
                         onClose={() => setOpenModal(false)}
                         setIsOpen={setOpenModal}
            />*/}
        </>
    );
}

export default DisplayEtudeCible;