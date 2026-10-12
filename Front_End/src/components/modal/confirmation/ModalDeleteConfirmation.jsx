import {Trash, TrashIcon} from "lucide-react";

export default function ModalDeleteConfirmation({ isOpen, onClose, onConfirm , loading }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl w-full max-w-sm p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <TrashIcon size={30} />
                </div>


                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    Confirmation De La suppression !
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Vous êtes sur le point de supprimer
                </p>

                <p className="text-xs text-red-500 mb-6">
                    Cette action est irréversible.
                </p>


                <div className="flex gap-3 w-full">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 text-sm font-medium border border-gray-200 dark:border-neutral-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            </>
                        ) : (
                            'Supprimer'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}