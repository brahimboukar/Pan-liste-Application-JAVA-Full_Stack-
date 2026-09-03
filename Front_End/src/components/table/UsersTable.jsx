import React, {useEffect, useState} from 'react';
import {Search} from "lucide-react";
import {axiosClient} from "../../api/axios.js";
import DisplayPaneliste from "./DisplayPaneliste.jsx";

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosClient.get('api/admin/panélistes');
            setUsers(res.data);
        } catch (err) {
            setError(err.response?.data?.error );
            setUsers([]);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUsers();
    },[])
    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Liste des Panélistes</h2>
                            <p className="text-sm text-gray-400">Gérez les Panélistes de votre plateforme.</p>
                        </div>

                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                            <input
                                type="text"
                                placeholder="Rechercher un panéliste..."



                                className="pl-10 pr-4 py-2.5 w-64 border border-gray-200 rounded-lg text-sm text-gray-700
                                    placeholder-gray-400 bg-gray-50
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                    focus:bg-white transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
                            Exporter
                        </button>
                        <button

                            className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-indigo-700 font-medium cursor-pointer"
                        >
                            + Ajouter Un Panéliste
                        </button>
                    </div>
                </div>

                {/*{isModalOpen && (
                    <ModalAddPaneliste
                        getAllPaneliste={() => getAllUsers(currentPage, searchTerm)}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}*/}

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Panéliste</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Point</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Age</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sexe</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Région</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Fonction</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Téléphone</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="text-left py-5 px-7 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date Création</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <DisplayPaneliste
                            users={users}
                            loading={loading}
                        />
                        </tbody>
                    </table>

                   {/* <PaginationTable
                        currentPage={currentPage}
                        lastPage={lastPage}
                        total={total}
                        onPageChange={handlePageChange}
                    />*/}
                </div>
            </div>
        </div>
    );
}

export default UsersTable;