import { createContext, useContext, useState } from "react";
import { basicAuthentication } from "../service/TodoApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    // function login(username, password) {
    //     if (username === 'admin' && password === 't0d0') {
    //         setAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     } else {
    //         setAuthenticated(false);
    //         return false;
    //     }
    // }

    function login(username, password) {

        const baToken = 'Basic ' + window.btoa(username + ":" + password);

        basicAuthentication(baToken)
            .then(response => console.log('response :>> ', response))
            .catch(error => console.log('error :>> ', error))
    }

    function logout() {
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    );

}