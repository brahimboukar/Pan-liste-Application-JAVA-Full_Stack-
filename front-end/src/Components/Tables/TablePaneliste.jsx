import { Edit, Eye, Filter, Mars, Plus, Receipt, Search, Trash2, UserLock, Users, Venus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Paneliste from '../../Services/Paneliste'

export default function TablePaneliste() {
    const [users , setUsers] = useState([])

    const getUsers = async() => {
    const user = await Paneliste.getAllUsers()
        return setUsers(user)
    }

    useEffect(() => {
        getUsers()
    },[])
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    const DispalyUsers = () => {
        return users.map((use) => {
            return <tr key={use.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                {use.nom?.charAt(0)}{use.prenom?.charAt(0)}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">
                                    {use.nom} {use.prenom}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {use.email}
                                </div>
                            </div>
                        </div>
                    </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{use.age}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{use.points}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{use.telephone}</td>
                  <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                            use.blocked === false || use.blocked === 0
                                ? 'bg-green-50 text-green-600 border-green-200'
                                : 'bg-red-50 text-red-600 border-red-200'
                        }`}>
                            {use.blocked === false || use.blocked === 0 ? 'Active' : 'Bloquer'}
                        </span>
                    </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                  {use.sexe.libelle=== "HOMME" ? <Mars /> : <Venus />
                  }
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{use.region.libelle}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{use.fonction.libelle}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{use.fonctionDeteiller.libelle.substring(0,20)}...</td>
                  <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{formatDate(use.dateNaissance)}</td>
                  <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                            <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                                <UserLock size={16} />
                            </button>
                            <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                                <Edit size={16} />
                            </button>
                            <button className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </td>
                
            </tr>
        })
    }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                    <Users size={20} />
                    <span className='text-sm font-medium'>Listes Des Panélistes</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Search"
                        className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium">
                        <Plus size={16} />
                        Ajouter Nouvaux Panéliste
                    </button>
                    
                  </div>
                </div>
    
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nom Complete Et Email</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Age</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Point</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Téléphone</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">statut</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Sexe</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Région</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Fonction</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 whitespace-nowrap">Fonction Détailler</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date Naissance</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DispalyUsers()}
                    </tbody>
                </table>
            </div>
              </div>
  )
}
