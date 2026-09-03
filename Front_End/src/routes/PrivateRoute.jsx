import { Navigate, useLocation } from "react-router-dom";
import NotFondUrl from "../page/landing/NotFondUrl.jsx";
import Check from "./Check.js";

function PrivateRoute({ children, adminOnly = false, userOnly = false }) {
    const location = useLocation();

    if (!Check.isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !Check.isAdmin()) {
        return <NotFondUrl />;
    }

    if (userOnly && !Check.isUser()) {
        return <NotFondUrl />;
    }

    return children;
}

export default PrivateRoute;