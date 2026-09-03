import React, { useState } from 'react';
import NavBar from "../components/NavBar/NavBar.jsx";
import HeaderBar from "../components/NavBar/HeaderBar.jsx";
import { Outlet, useLocation } from "react-router-dom"; // ajouter useLocation

const TITLE_BY_PATH = {
    '/admin/dashboard': 'Dashboard',
    '/admin/paneliste': 'Panélistes',
    '/admin/categories-recomponses': 'Catégorie Récompenses',
    '/admin/recomponses': 'Récompenses',
    '/admin/categories-etudes': 'Catégorie Etudes',
    '/admin/etudes': 'Etudes',
    '/admin/etudes-cible': 'Etudes Cible',
    '/admin/demandes-recomponses': 'Demandes Recomponses',
    '/admin/evenements': 'Evenements',
    '/admin/evenement-participants': 'Evenement Participants',
};

function Layout() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const location = useLocation(); // hook réactif de React Router

    const title = TITLE_BY_PATH[location.pathname] ?? 'Tableau de bord';

    return (
        <div className="flex h-screen bg-gray-50">
            <NavBar isCollapsed={isNavCollapsed} onToggle={() => setIsNavCollapsed((prev) => !prev)}/>

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <HeaderBar
                    title={title}
                    onToggleNav={() => setIsNavCollapsed((prev) => !prev)}
                />

                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;