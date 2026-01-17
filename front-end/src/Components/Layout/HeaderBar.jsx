import { Menu, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Header from '../../Services/Header'

function HeaderBar() {

  const [user , setUser] = useState(null)
  const getCurrentUser = async() => {
    const use = await Header.currentUser()
    return setUser(use)
  }

  useEffect(() => {
    getCurrentUser()
  },[])
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">SALUT {user?.nom}</h1>
              <p className="text-sm text-gray-500">Manage your profits and track event transactions</p>
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
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  BB
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.nom} {user?.prenom}</p>
                  <p className="text-xs text-gray-500">Adminstrateur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default HeaderBar
