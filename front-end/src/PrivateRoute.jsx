import React from "react"
import Authentication from "./Services/Authentication"
import { Navigate } from "react-router"

const PrivateRoute = ({children , adminOnly=false , userOnly = false} ) => {

        if(!Authentication.isAuthentication()) {
            return <Navigate to="/login" replace/>
        }

        if (adminOnly && !Authentication.isAdmin()) {
        return <Navigate to="/login" replace />;
        }

        if (userOnly && !Authentication.isUser()) {
        return <Navigate to="/login" replace />;
        }

  return children;
}
export default PrivateRoute