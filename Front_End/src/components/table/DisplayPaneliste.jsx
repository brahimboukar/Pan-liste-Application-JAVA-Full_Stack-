import React from 'react';
import {Edit, Eye, Lock, LockOpen, Mars, Trash2, Venus, Users, Loader2, LoaderPinwheel, Loader} from "lucide-react";

function DisplayPaneliste({ users , loading}) {
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
            'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };
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
                    {/* Panéliste */}
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
                    {/* Point */}
                    <td className="py-4 px-4">
                        <span className="text-sm font-semibold text-gray-800">{user.points}</span>
                    </td>
                    {/* Age */}
                    <td className="py-4 px-4">
                        <span className="text-sm font-semibold text-gray-800">{user.age}</span>
                    </td>
                    {/* Sexe */}
                    <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            {user.sexe?.libelle === "HOMME"
                                ? <><Mars size={15} className="text-blue-400" /> Homme</>
                                : <><Venus size={15} className="text-pink-400" /> Femme</>
                            }
                        </div>
                    </td>
                    {/* Région */}
                    <td className="py-4 px-4 text-sm text-gray-600">
                        {user.region?.libelle?.substring(0, 7)}...
                    </td>
                    {/* Fonction */}
                    <td className="py-4 px-4">
                        <div className="text-sm text-gray-700">{user.fonction?.libelle?.substring(0, 20)}...</div>
                        {user.fonctionDeteiller?.libelle && (
                            <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[140px]">
                                {user.fonctionDeteiller?.libelle || "-"}
                            </div>
                        )}
                    </td>
                    {/* Téléphone */}
                    <td className="py-4 px-4 text-sm text-gray-500">
                        {user.telephone}
                    </td>
                    {/* Status */}
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
                    {/* Date */}
                    <td className="py-4 px-4 text-sm text-gray-500">
                        <span className="text-sm text-gray-600">{formatDate(user.created_at)}</span>
                    </td>
                    {/* Actions — inchangé */}
                    <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
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
                            <button title="Supprimer" className="p-1.5 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default DisplayPaneliste;