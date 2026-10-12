import React from 'react';
import { AlertTriangle, X } from "lucide-react";

function ModalErreur({ isOpen, onClose, message , bigmessage}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg w-full max-w-sm p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <X size={18} />
                </button>

                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle size={28} className="text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {bigmessage}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {message}
                    </p>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalErreur;