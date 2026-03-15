// IMPORTED CORE MODULES
import { createContext, useContext, useEffect, useState } from "react";
// IMPORTED CUSTOM MODULES
import { SERVER } from "../../../config";

const AuthContext = createContext();

export const AuthProvider = function ({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [activeUser, setActiveUser] = useState(null);

    const authenticate = async (url, method, body) => {
        const request = await fetch(`${SERVER}${url}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const response = await request.json();

        setIsLoading(false);

        // Guard clause.
        if (!response.success) return response;

        const { data } = response;

        localStorage.setItem("token", data.token);

        setActiveUser(data.user);

        return response;
    };

    const logout = async (token, url, method) => {
        const request = await fetch(`${SERVER}${url}`, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const response = await request.json();

        setIsLoading(false);

        // Guard clause.
        if (!response.success) return false;

        setActiveUser(null);

        localStorage.removeItem("token");

        return true;
    };

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");

            // Guard clause.
            if (!token) return setIsLoading(false);

            const request = await fetch(`${SERVER}/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const response = await request.json();

            setIsLoading(false);

            // Guard clause.
            if (!response.success) return localStorage.removeItem("token");

            setActiveUser(response.data);
        })();
    }, []);

    return <AuthContext.Provider value={{ isLoading, activeUser, authenticate, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
