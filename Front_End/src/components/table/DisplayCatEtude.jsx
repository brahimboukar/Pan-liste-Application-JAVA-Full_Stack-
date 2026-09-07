import React from 'react';
import {CircleStar, Loader, Trash2} from "lucide-react";

function DisplayCatEtude({categorieEtude , error,loading}) {
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
                    <td className="py-3 px-4 text-sm font-medium text-violet-600">{item.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{item.libelle}</td>
                    <td className="py-3 px-4">
                        <button
                            title="Supprimer"
                            className="p-1.5 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default DisplayCatEtude;