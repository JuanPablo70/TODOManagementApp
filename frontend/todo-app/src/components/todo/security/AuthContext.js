import { createContext, useContext, useState } from "react";
import { apiClient } from "../service/ApiClient";
import { jwtAuthentication } from "../service/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    const [token, setToken] = useState(null);

    async function login(username, password) {


        try {
            const response = await jwtAuthentication(username, password);
            let authorized;

            if (response.status == 200) {
                const jwtToken = 'Bearer ' + response.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);

                // Setting interceptor to add authorization token to any REST API request
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = jwtToken;
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