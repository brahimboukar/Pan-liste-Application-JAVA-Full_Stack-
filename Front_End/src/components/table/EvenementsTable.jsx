import {useEffect, useState} from "react";
import { Search, Download, Plus } from "lucide-react";
import {axiosClient} from "../../api/axios.js";
import DisplayEvenements from "./DisplayEvenements.jsx";
import PaginationTable from "../pagination/PaginationTable.jsx";
import ModalAddEvenments from "../modal/ajoute/ModalAddEvenments.jsx";

export default function EvenementsTable() {
    const [error, setError] = useState(null);
    const [evenements, setEvenements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(1);

    const getAllEvenements = async (page=1) => {
        setError([])
        setLoading(true)
        try {
            const res = await axiosClient.get('api/admin/evenement/list',{
                params : {
                    page: page - 1,
                    size: 3
                }
            });
            setEvenements(res.data.content);
            setCurrentPage(res.data.number + 1);
            setLastPage(res.data.totalPages);
        } catch (err) {
            console.log(err);
            setError(err.response.data.error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllEvenements(1);
    },[])
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">évenements</h2>
                        <p className="mt-0.5 text-sm text-slate-500">Gérez les évenements de votre plateforme</p>
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



                        <button onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700"
                        >
                            <Plus className="h-4 w-4" />
                            Ajouter Un évenements
                        </button>
                    </div>
                </div>
                {
                    isModalOpen && (
                        <ModalAddEvenments  getAllEvenements={getAllEvenements}
                                        onClose={() => setIsModalOpen(false)}

                        />
                    )
                }

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            <th className="px-6 py-3 font-medium">Evénements</th>
                            <th className="px-4 py-3 font-medium">Description</th>
                            <th className="px-4 py-3 font-medium">Date Debut</th>
                            <th className="px-4 py-3 font-medium">Date Fin</th>
                            <th className="px-4 py-3 font-medium">Créée le</th>
                            <th className="px-4 py-3 text-right font-medium">Action</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                        <DisplayEvenements
                            evenements={evenements}
                            loading={loading}
                            getAllEvenements={getAllEvenements}
                        />
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <PaginationTable currentPage={currentPage}
                                 lastPage={lastPage}
                                 onPageChange={(page) => getAllEvenements(page)}
                />
            </div>
        </div>
    );
}