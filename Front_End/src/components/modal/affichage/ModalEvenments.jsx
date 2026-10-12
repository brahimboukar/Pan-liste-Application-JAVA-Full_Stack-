import React from 'react';
import {format} from "date-fns";
import {Calendar, CheckCircle, Coins, Package, Tag, X, XCircle} from "lucide-react";

function ModalEvenments({ isOpen, setIsOpen, evenments }) {
    if (!isOpen) return null;

    const formatDate = (date) => {
        return format(new Date(date), "dd MMM, yyyy");
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">

            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-slideUp">
                <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">
                        {evenments.libelle}
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-white/20 rounded-full p-1.5 hover:bg-white/30 transition-all duration-200 hover:scale-110"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex justify-center mb-4">
                        {evenments.byteImg ? (
                            <img
                                src={`data:image/jpeg;base64,${evenments.byteImg}`}
                                alt={evenments.libelle}
                                className="w-32 h-32 object-cover rounded-lg shadow-md"
                            />
                        ) : (
                            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-lg">
                                <Package size={60} className="text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div className="mb-4 p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                            <Tag size={16} className="text-gray-600" />
                            <span className="text-xs text-gray-600 font-medium">Description</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">{evenments.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">

                        <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar size={16} className="text-gray-600" />
                                <span className="text-xs text-gray-600 font-medium">Date Debut</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">{formatDate(evenments.dateDebut)}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar size={16} className="text-gray-600" />
                                <span className="text-xs text-gray-600 font-medium">Date Fin</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">{formatDate(evenments.dateFin)}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar size={16} className="text-gray-600" />
                                <span className="text-xs text-gray-600 font-medium">Créée le</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">{formatDate(evenments.created_at)}</p>
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

export default ModalEvenments;