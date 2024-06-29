import { createContext, useContext, useState } from "react";
import { basicAuthentication } from "../service/TodoApiService";
import { apiClient } from "../service/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    const [token, setToken] = useState(null);

    async function login(username, password) {

        const baToken = 'Basic ' + window.btoa(username + ":" + password);

        try {
            const response = await basicAuthentication(baToken);
            let authorized;

            if (response.status == 200) {
                setAuthenticated(true);
                setUsername(username);
                setToken(baToken);

                // Setting interceptor to add authorization token to any REST API request
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = baToken;
                        return config;
                    }
                );

                authorized = true;
            } else {
                logout();
                authorized = false;
            }

            return authorized;

        } catch(error) {
            logout();
            return false;
        }
        
    }

    function logout() {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    );

}