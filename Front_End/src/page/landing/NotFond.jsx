import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFond() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-50">
            <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-xl shadow-slate-950/80">
                <p className="text-sm font-semibold tracking-[0.2em] text-indigo-400">
                    ERREUR 404
                </p>
                <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Page introuvable</h1>
                <p className="mt-4 text-sm text-slate-300 sm:text-base">
                    La page que vous cherchez n&apos;existe pas ou a été déplacée.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
                    >
                        Retour à l&apos;accueil
                    </Link>
                    <Link
                        to="/login"
                        className="rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                    >
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
}