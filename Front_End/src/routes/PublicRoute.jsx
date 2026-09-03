import { Navigate } from "react-router-dom";
import Check from "./Check.js";

function PublicRoute({ children }) {
    if (Check.isAuthenticated()) {
        const redirectTo = Check.isAdmin() ? "/admin/dashboard" : "/recomponse";
        return <Navigate to={redirectTo} replace />;
    }
    return children;
}

export default PublicRoute;