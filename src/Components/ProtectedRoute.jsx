import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const accessToken = sessionStorage.getItem('access_token')

    const isAuthenticatedUser = Boolean(accessToken)

    return isAuthenticatedUser ? <Outlet /> : <Navigate to={'/login'} replace />

}

export default ProtectedRoute