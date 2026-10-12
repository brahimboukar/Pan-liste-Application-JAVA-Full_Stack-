import React from 'react'

export default function ToastSucces({isOpen,message , title , onClose}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">
                <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                        <svg
                            className="h-10 w-10 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900">
                    {title}
                </h2>
                <p className="mt-3 text-center text-gray-500">
                    {message}
                </p>
                <button
                    onClick={onClose}
                    className="mt-8 w-full rounded-lg bg-indigo-600 py-3 text-lg font-medium text-white hover:bg-indigo-700 transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
