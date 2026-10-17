import React, {useState} from 'react';
import {Edit, Eye, Lock, LockOpen, Mars, Trash2, Venus, Users, Loader2, LoaderPinwheel, Loader} from "lucide-react";
import ModalPanéliste from "../modal/affichage/ModalPanéliste.jsx";
import ModalDeleteConfirmation from "../modal/confirmation/ModalDeleteConfirmation.jsx";
import {axiosClient} from "../../api/axios.js";
import ToastSucces from "../toast/ToastSucces.jsx";

function DisplayPaneliste({ users , loading , currentPage , getAllUsers}) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState("");
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errors, setErrors] = useState('');
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isModalOpen , setIsModalOpen] = useState(false);
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
            'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };
    const handleDelete = async () => {
        setErrors('')
        setLoadingDelete(true);
        try {
            await axiosClient.delete(`/api/admin/panéliste/delete/${selectedUsers.id}`);
            const newPage = users.length === 1 && currentPage > 0
                ? currentPage - 1 : 0;
            setIsDeleteOpen(false);
            setIsSuccessOpen(true);
            getAllUsers(newPage);
        } catch (error) {
            if(error.response.data.statusCode === 404) {
                setErrors(error.response.data.error );
            } else if (error.response.data.statusCode === 403) {
                setErrors(error.response.data.error );
            } else if (error.response.data.statusCode === 500) {
                setErrors(error.response.data.error );

            } else{
                setErrors(error.response.data.error );
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
                <td colSpan={10} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <Loader size={40} className="text-indigo-500 animate-spin mb-4" />
                        <span className="text-sm font-medium text-gray-500">Chargement des données...</span>
                    </div>
                </td>
            </tr>
        );
    }

    if (!users || users.length === 0) {
        return (
            <tr>
                <td colSpan={10} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <Users size={32} className="text-gray-300" />
                        </div>
                        <span className="text-sm font-semibold text-gray-500">Aucun Panéliste</span>
                        <span className="text-xs text-gray-400 mt-1">La liste est actuellement vide</span>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <>
            {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                                {user.nom?.charAt(0)}{user.prenom?.charAt(0)}
                            </div>
                            <div className="leading-tight">
                                <div className="text-xs font-medium text-gray-900">
                                    {user.nom} {user.prenom}
                                </div>
                                <div className="text-[11px] text-gray-500">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="py-4 px-4">
                        <span className="text-sm font-semibold text-gray-800">{user.points}</span>
                    </td>
                    <td className="py-4 px-4">
                        <span className="text-sm font-semibold text-gray-800">{user.age}</span>
                    </td>
                    <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            {user.sexe === "HOMME"
                                ? <><Mars size={15} className="text-blue-400" /> Homme</>
                                : <><Venus size={15} className="text-pink-400" /> Femme</>
                            }
                        </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                        {user.region.substring(0, 7)}...
                    </td>
                    <td className="py-4 px-4">
                        <div className="text-sm text-gray-700">{user.fonction?.substring(0, 20)}...</div>
                        {user.fonctionDetailler && (
                            <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[140px]">
                                {user.fonctionDetailler}
                            </div>
                        )}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                        {user.telephone}
                    </td>
                    <td className="py-4 px-4">
                        {user.blocked === true || user.blocked === 1 ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-500 border border-red-200">
                    Bloqué
                </span>
                        ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200">
                    Active
                </span>
                        )}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                        <span className="text-sm text-gray-600">{formatDate(user.dateCreation)}</span>
                    </td>
                    <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                            <button title="Voir" className="p-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                                    onClick={() => {setOpenModal(true) ; setSelectedUsers(user)}}
                            >
                                <Eye size={13} />
                            </button>
                            {user.blocked === false ?
                                <button
                                    className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                                    title="Bloquer"
                                >
                                    <Lock size={14} />
                                </button>
                                :
                                <button
                                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                                    title="Débloquer"
                                >
                                    <LockOpen size={13} />
                                </button>
                            }
                            <button title="Modifier" className="p-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors">
                                <Edit size={13} />
                            </button>
                            <button onClick={() => { setSelectedUsers(user); setIsDeleteOpen(true) }}
                                title="Supprimer" className="p-1.5 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            <ModalPanéliste user = {selectedUsers}
            isOpen={openModal}
            onClose={() => setOpenModal(false)} setIsOpen={setOpenModal}
            />
            <ModalDeleteConfirmation
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                loading={loadingDelete}
            />
            <ToastSucces
                isOpen={isSuccessOpen}
                onClose={handleSuccessClose}
                message="Panéliste supprimée avec succès !"
            />
        </>
    );
}

export default DisplayPaneliste;