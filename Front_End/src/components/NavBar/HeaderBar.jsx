import React, { useState } from 'react'
import {Search, ChevronDown, User, Settings, LogOut, Menu, ChevronLeft} from "lucide-react";

function HeaderBar({onToggleNav , title }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onToggleNav}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <Menu size={20} />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                    <div>

                    </div>
                </div>
                <div className="flex items-center gap-40">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Chercher"
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div
                        className="relative"
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                    >
                        <button
                            type="button"
                            className="inline-flex items-center gap-2.5 rounded-lg px-2 py-1 transition hover:bg-gray-100"
                        >

                                    <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-xs text-white">
                                        BB
                                    </div>
                                    <div className="text-left leading-tight">
                                        <p className="text-xs font-medium">BOUKAR BRAHIM</p>
                                        <p className="text-xs text-gray-500">Adminstrateur</p>
                                    </div>

                            <ChevronDown
                                size={16}
                                className={`ml-0.5 flex-shrink-0 text-slate-500 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </button>

                        <div
                            className={`absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-lg transition-all duration-150 ${
                                isMenuOpen
                                    ? 'visible translate-y-0 opacity-100'
                                    : 'invisible -translate-y-1 opacity-0'
                            }`}
                        >
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-100">
                                <User size={14} />
                                <span>Mon profil</span>
                            </button>
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-100">
                                <Settings size={14} />
                                <span>Paramètres</span>
                            </button>
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50">
                                <LogOut size={14} />
                                <span>Déconnexion</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HeaderBar