import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(null);

    const [accessToken, setAccessToken] = useState(null);

    // Load user from localStorage on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("auth");
        const storedToken = localStorage.getItem("access_token");

        if (storedUser && storedToken) {
           try {
                setAuth(JSON.parse(storedUser)); // only parse user
                setAccessToken(storedToken);    
            } catch (error) {
                localStorage.clear(); // clear corrupted data
            }
        }
    }, []);

    const login = (data) => {
        setAuth(data.user);
        setAccessToken(data.access_token)

        localStorage.setItem("auth", JSON.stringify(data.user));
        localStorage.setItem("access_token", data.access_token);
        // localStorage.setItem("refresh_token", data.refresh_token);
    };

    const logout = () => {
        setAuth(null);
        setAccessToken(null);
        localStorage.removeItem("auth");
        localStorage.removeItem("access_token");
        // localStorage.removeItem("refresh_token");
    };

    return (
        <AuthContext.Provider value={{ auth, accessToken, isAuthenticated: !!accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);