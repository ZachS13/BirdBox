// IMPORTED CORE MODULES
import { Navigate, Outlet } from "react-router-dom";
// IMPORTED CUSTOM MODULES
import { useAuth } from "../context/Auth";

const Protected = function () {
    const { isLoading, activeUser } = useAuth();

    // Guard clause.
    if (isLoading) return;

    return activeUser ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
