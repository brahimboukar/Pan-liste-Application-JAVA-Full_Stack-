import React, {useState} from 'react';
import {CircleStar, Coins, Eye, Gift, Loader, MoreHorizontal} from "lucide-react";
import StatusBadge from "../badge/StatusBadge.jsx";
import ModalRecomponses from "../modal/affichage/ModalRecomponses.jsx";

function DisplayRecomponses({recomponses , loading}) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedReco, setSelectedReco] = useState(null);

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
    if (!recomponses || recomponses.length === 0) {
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
            {recomponses.map((r) => (
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
                            <span className="text-sm font-medium text-slate-800">{r.libelle}</span>
                        </div>
                    </td>

                    <td className="px-4 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      {r.categorie_id.libelle}
                    </span>
                    </td>

                    <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                      <Coins className="h-3.5 w-3.5" />
                        {r.point.toLocaleString("fr-FR")}
                    </span>
                    </td>

                    <td className="px-4 py-4">
                        <StatusBadge status={r.status}/>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-500">{r.date}</td>

                    <td className="py-4 px-4 border-r border-gray-200">
                        <div className="flex items-center gap-0 justify-start">
                            <button
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                                title="Voir" onClick={() => {setOpenModal(true) ; setSelectedReco(r)}}
                            >
                                <Eye size={18}/>
                            </button>
                            {/*<button
                                className="p-1 text-amber-600 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                                title="Modifier" onClick={() => {setIsModalOpen(true) ; setSelectedReco(rec)}}
                            >
                                <Pencil size={18}/>
                            </button>
                            <ModalRecomponses recomponse = {selectedReco} isOpen={openModal} onClose={() => setOpenModal(false)} setIsOpen={setOpenModal} />
                            <ModalModificationReco
                                setIsOpen={setIsModalOpen}
                                getAllRecomponses = {getAllRecomponse}
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                recomponse = {selectedReco}
                            />
                            <ModalDeleteConfirmation loading={loadingDelete} isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete} />
                            <ModalSuccess
                                isOpen={isSuccessOpen}
                                onClose={() => { setIsSuccessOpen(false); onClose(); }}
                                message="Récompense supprimée avec succès !"
                            />
                            <button
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                title="Supprimer" onClick={() => {setSelectedReco(rec); setIsDeleteOpen(true);}}
                            >
                                <Trash size={18}/>
                            </button>*/}
                        </div>
                    </td>
                </tr>
            ))}
            <ModalRecomponses recomponse = {selectedReco} isOpen={openModal} onClose={() => setOpenModal(false)} setIsOpen={setOpenModal} />
        </>
    );
}

export default DisplayRecomponses;