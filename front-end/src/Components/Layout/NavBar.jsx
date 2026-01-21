import React, { useEffect, useState } from 'react'
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
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const [activeMenu, setActiveMenu] = useState('');
  const location = useLocation();
  const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard' },
  { name: 'Panélistes', icon: Users, link: '/panéliste' },
  { name: 'Catégorie Récomponses', icon: Layers, link: '/categories-recomponses' },
  { name: 'Récomponses', icon: CircleStar, link: '/recomponses' },
  { name: 'Catégorie Etudes', icon: Layers, link: '/categories-etudes' },
  { name: 'Etudes', icon: ClipboardList, link: '/etudes' },
  { name: 'Etudes Cible', icon: SquareMousePointer, link: '/etudes-cible' },
  { name: 'Demande Récomponses', icon: HandCoins, link: '/demandes-recomponses' },
  { name: 'Evenement', icon: CalendarSync, link: '/evenements' },
  { name: 'Evenement Participant', icon: Contact, link: '/evenement-participants' },
];


 useEffect(() => {
  const currentPage = menuItems.find(
    item => item.link === location.pathname
  );

  if (currentPage) {
    setActiveMenu(currentPage.name);
  }
}, [location.pathname]);

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
            <Link
              key={item.name}
              to={item.link}
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors
                ${
                  activeMenu === item.name
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <item.icon size={20} />
              <span className="flex-1 text-left text-sm">{item.name}</span>
            </Link>
))}
        </div>
      </div>
  )
}

export default NavBar
