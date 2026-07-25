import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function PublicRoute() {

    const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)

    return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />

}

export default PublicRoute