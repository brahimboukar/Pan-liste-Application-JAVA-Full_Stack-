import React from 'react';
import {Trash2} from "lucide-react";

function DisplayCatRec({categorieRec}) {
    return (
        <>
            {categorieRec.map((item) => (
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

export default DisplayCatRec;