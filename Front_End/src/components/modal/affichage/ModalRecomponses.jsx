import React from 'react';
import {X, Package, Tag, Coins, Calendar, CheckCircle, XCircle, Gift} from 'lucide-react';
import { format } from 'date-fns';
import StatusBadge from "../../badge/StatusBadge.jsx";

function ModalRecomponses({ isOpen, setIsOpen, recomponse }) {
    if (!isOpen) return null;
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    const formatDate = (date) => {
        return format(new Date(date), "dd MMM, yyyy");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">

            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-slideUp">
                <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">
                        {recomponse.libelle}
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
                        {recomponse.byteImg ? (
                            <img
                                src={`data:image/jpeg;base64,${recomponse.byteImg}`}
                                alt={recomponse.libelle}
                                className="h-15 w-15 shrink-0 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                                <Gift className="h-4 w-4" />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center mb-4">
                        <StatusBadge status={recomponse.status} />
                    </div>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div className="mb-4 p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                            <Tag size={16} className="text-gray-600" />
                            <span className="text-xs text-gray-600 font-medium">Catégorie</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">{recomponse.categorie_id.libelle}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Points en évidence */}
                        <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Coins size={16} className="text-indigo-600" />
                                <span className="text-xs text-gray-600 font-medium">Points</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">{recomponse.point}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar size={16} className="text-gray-600" />
                                <span className="text-xs text-gray-600 font-medium">Créée le</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-700"></p>
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

export default ModalRecomponses;