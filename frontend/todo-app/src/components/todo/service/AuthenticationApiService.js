import { apiClient } from './ApiClient';


export const basicAuthentication = 
    (token) => apiClient.get(`/basicauth`, 
        { 
            headers: { 
                Authorization: token 
            } 
        });

export const jwtAuthentication = (username, password) => apiClient.post(`/authenticate`,  { username, password });