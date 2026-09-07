import {useEffect, useState} from "react";
import { Search, Download, Plus } from "lucide-react";
import DisplayRecomponses from "./DisplayRecomponses.jsx";
import {axiosClient} from "../../api/axios.js";
import DisplayEtude from "./DisplayEtude.jsx";

export default function EtudeTable() {
    const [error, setError] = useState(null);
    const [etude, setEtudes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllEtudess = async () => {
        setError([])
        setLoading(true)
        try {
            const res = await axiosClient.get('api/admin/etude/list');
            setEtudes(res.data);
        } catch (err) {
            console.log(err);
            setError(err.response.data.error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllEtudess();
    },[])
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Etudes</h2>
                        <p className="mt-0.5 text-sm text-slate-500">Gérez les Etudes de votre plateforme</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-48 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <select
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                        >
                            <option value="">Toutes les catégories</option>
                            {/*{cat.map((c) => (
                                <option key={c.id} value={c.id}>{c.libelle}</option>
                            ))}*/}
                        </select>

                        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                            <Download className="h-4 w-4" />
                            Exporter
                        </button>

                        <button
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700"
                        >
                            <Plus className="h-4 w-4" />
                            Ajouter
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            <th className="px-6 py-3 font-medium">Etude</th>
                            <th className="px-4 py-3 font-medium">Catégorie</th>
                            <th className="px-4 py-3 font-medium">Description</th>
                            <th className="px-4 py-3 font-medium">Points</th>
                            <th className="px-4 py-3 font-medium">Durré</th>
                            <th className="px-4 py-3 font-medium">Créée le</th>
                            <th className="px-4 py-3 text-right font-medium">Action</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                        <DisplayEtude etudes={etude} loading={loading}/>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {/*<div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                    <p className="text-sm text-slate-500">Affichage de <span className="font-medium text-slate-700">1–5</span> sur <span className="font-medium text-slate-700">24</span></p>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3].map((p) => (
                            <button
                                key={p}
                                className={`h-8 w-8 rounded-lg text-sm font-medium ${
                                    p === 1 ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100"
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>*/}
            </div>
        </div>
    );
}