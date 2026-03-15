// IMPORTED CORE MODULES
import { Navigate, Outlet } from "react-router-dom";
// IMPORTED CUSTOM MODULES
import { useAuth } from "../context/Auth";

const Public = function () {
    const { isLoading, activeUser } = useAuth();

    // Guard clause.
    if (isLoading) return;

    return activeUser ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default Public;
