import React, { useState } from 'react'
import { 
    LayoutDashboard,
    Menu,
    Users,
    Layers,
    CircleStar,
    ClipboardList,
    SquareMousePointer,
    HandCoins,
    CalendarSync,
    Contact,
    } from "lucide-react";

function NavBar() {
    const [activeMenu, setActiveMenu] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, badge: null },
    { name: 'Panélistes', icon: Users },
    { name: 'Catégorie Récomponses', icon: Layers},
    { name: 'Récomponses', icon: CircleStar},
    { name: 'Catégorie Etudes', icon: Layers},
    { name: 'Etudes', icon: ClipboardList},
    { name: 'Etudes Cible', icon: SquareMousePointer},
    { name: 'Demande Récomponses', icon: HandCoins},
    { name: 'Evenement', icon: CalendarSync},
    { name: 'Evenement Participant', icon: Contact},
  ];
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="font-bold text-xl">Express</span>
          <button className="ml-auto text-gray-400">
            <Menu size={20} />
          </button>
        </div>

        
        <div className="px-4">
        <p className="text-xs text-gray-500 mb-2 px-3">Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                activeMenu === item.name
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              <span className="flex-1 text-left text-sm">{item.name}</span>
              {item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeMenu === item.name ? 'bg-indigo-500' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
  )
}

export default NavBar
