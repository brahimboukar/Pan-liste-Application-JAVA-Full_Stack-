import React from 'react';
import {Calendar, Coins, Package, Tag, X} from "lucide-react";
import {format} from "date-fns";

function ModalPanéliste({isOpen, setIsOpen, user}) {
    if (!isOpen) return null;
    const formatDate = (date) => {
        return format(new Date(date), "dd MMM, yyyy");
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">

            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-slideUp">

                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-white/20 rounded-full p-1.5 hover:bg-white/30 transition-all duration-200 hover:scale-110"
                    >
                        <X size={20} className="text-indigo-600" />
                    </button>
                    <div className="border-t border-gray-200 my-4"></div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Nom</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.nom}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">

                                <span className="text-xs text-gray-600 font-medium">Prénom</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.prenom}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Email</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.email}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Telephone</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.telephone}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Age</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.age}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Point</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.points}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Sexe</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.sexe}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Région</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.region}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Fonction</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.fonction}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Fonction Détailler</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{user.fonctionDetailler}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600 font-medium">Status</span>
                            </div>
                            {
                                user.bloked == true ? (
                                    <p className="text-2xl font-bold text-indigo-600">Bloquer</p>
                                ) : (
                                    <p className="text-2xl font-bold text-indigo-600">Active</p>
                                )
                            }
                        </div>

                        <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar size={16} className="text-gray-600" />
                                <span className="text-xs text-gray-600 font-medium">Créée le</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">{formatDate(user.dateCreation)}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-4 pt-4 flex gap-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalPanéliste;