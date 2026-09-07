import React from 'react';
import {Calendar, CircleStar, Coins, Gift, Loader, MoreHorizontal, Timer} from "lucide-react";
import StatusBadge from "../badge/StatusBadge.jsx";
import {format} from "date-fns";

function DisplayEvenements({evenements , loading}) {
    const formatDate = (date) => {
        return format(new Date(date), "dd MMM, yyyy");
    };

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
                            <span className="text-sm font-medium text-slate-800">{r.libelle}</span>
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



                    <td className="px-4 py-4 text-sm text-slate-500">{r.date}</td>

                    <td className="px-4 py-4">
                        <div className="flex justify-end">
                            <button className="rounded-md p-1.5 text-slate-400 opacity-0 transition-opacity hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default DisplayEvenements;