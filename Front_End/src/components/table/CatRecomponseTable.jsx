import React, {useEffect, useState} from 'react';
import {Search} from "lucide-react";
import {axiosClient} from "../../api/axios.js";
import DisplayCatRec from "./DisplayCatRec.jsx";
import ModalAddCategorieRec from "../modal/ajoute/ModalAddCategorieRec.jsx";
import PaginationTable from "../pagination/PaginationTable.jsx";

function CatRecomponseTable() {
    const [error, setError] = useState(null);
    const [cat , setCat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const getAllCats = async (page = currentPage) => {
        setError(null);
        setLoading(true);
        try {
            const res = await axiosClient.get('api/admin/categorieRecomponse/listCategorie',{
                params: {
                    page : page,
                    size : pageSize
                }
            });
            setCat(res.data.data);
            setTotalPages(res.data.totalPages);
            setTotalElements(res.data.totalElements);
            setCurrentPage(res.data.currentPage);
        } catch (err) {
            setError(err.response?.data?.error );
            setCat([]);
        } finally {
            setLoading(false);
        }
    }
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }
    useEffect(() => {
        getAllCats(currentPage)
    }, [currentPage]);
    return (
        <>
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-neutral-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Liste des Catégories
                    </h2>
                    <p className="text-sm text-gray-400 mt-0.5">
                        Gérez les catégories de récompenses de votre plateforme.
                    </p>
                </div>

                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Rechercher une catégorie..."
                        className="pl-10 pr-4 py-2.5 w-64 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm text-gray-700 dark:text-white
                                    placeholder-gray-400 bg-gray-50 dark:bg-neutral-800
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                    focus:bg-white dark:focus:bg-neutral-700 transition-all duration-200
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
                <div className="flex gap-3">

                    <button
                        className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-indigo-700 font-medium cursor-pointer"
                        onClick = {() => setIsModalOpen(true)}
                    >
                        + Ajouter Une Catégorie
                    </button>
                </div>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full min-w-[300px]">
                <thead>
                <tr className="border-b border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/50">
                    <th className="w-16 text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Libellé</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date De Creation </th>
                    <th className="w-20 text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
                </thead>
                <tbody>
                <DisplayCatRec
                    categorieRec={cat}
                    error={error}
                    loading={loading}
                    currentPage={currentPage}
                    getAllCategorie = {getAllCats}
                />
                </tbody>
            </table>
        </div>
        <PaginationTable
            currentPage={currentPage + 1}
            lastPage={totalPages}
            total={totalElements}
            onPageChange={(page) => handlePageChange(page - 1)}
        />
    </div>
            {
                isModalOpen && (
                    <ModalAddCategorieRec
                        isOpen={isModalOpen}
                        getAllCat={getAllCats}
                        onClose={() => setIsModalOpen(false)}
                    />
                )
            }
        </>
    );
}

export default CatRecomponseTable;