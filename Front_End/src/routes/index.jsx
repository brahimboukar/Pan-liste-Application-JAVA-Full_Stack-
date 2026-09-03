import Home from "../page/landing/Home.jsx";
import Login from "../page/authentication/Login.jsx";
import {createBrowserRouter} from "react-router-dom";
import NotFond from "../page/landing/NotFond.jsx";
import Dashboard from "../page/admin/Dashboard.jsx";
import Recomponse from "../page/panélistes/Recomponse.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import Layout from "../layouts/Layout.jsx";
import Users from "../page/admin/Users.jsx";
import CatRecomponse from "../page/admin/CatRecomponse.jsx";
import AdminRecomponses from "../page/admin/AdminRecomponses.jsx";
import CatEtude from "../page/admin/CatEtude.jsx";
import Etude from "../page/admin/Etude.jsx";
import CibleEtude from "../page/admin/CibleEtude.jsx";
import DemendeRec from "../page/admin/DemendeRec.jsx";
import Evenement from "../page/admin/Evenement.jsx";
import EvenementParti from "../page/admin/EvenementParti.jsx";
export const router = createBrowserRouter([
    {
        path: "/",
        element : <Home />,
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: "*",
        element : <NotFond />
    },

    {
        element : <Layout/>,
        children : [
            {
                path: '/admin/dashboard',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <Dashboard />
                    </PrivateRoute>
                )
            },
            {
                path: '/admin/paneliste',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <Users />
                    </PrivateRoute>
                )
            },
            {
                path: '/admin/categories-recomponses',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <CatRecomponse />
                    </PrivateRoute>
                )
            },
            {
                path: '/admin/recomponses',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <AdminRecomponses />
                    </PrivateRoute>
                )
            },
            {
                path: '/admin/categories-etudes',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <CatEtude />
                    </PrivateRoute>
                )
            },
            {
                path: '/admin/etudes',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <Etude />
                    </PrivateRoute>
                )
            },
            {
                path: '/admin/etudes-cible',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <CibleEtude />
                    </PrivateRoute>
                )
            },
            {
                path: '/admin/demandes-recomponses',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <DemendeRec />
                    </PrivateRoute>
                )
            },
            {
                path: '/admin/evenements',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <Evenement />
                    </PrivateRoute>
                )
            },
            {
                path: '/admin/evenement-participants',
                element: (
                    <PrivateRoute adminOnly={true}>
                        <EvenementParti />
                    </PrivateRoute>
                )
            },
        ]

    },

    {
        path: '/recomponse',
        element: (
            <PrivateRoute userOnly={true}>
                <Recomponse />
            </PrivateRoute>
        )
    },
]);