import axios from 'axios';

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

export const retrieveAllTodosByUser = (username) => apiClient.get(`/users/${username}/todos`);

export const deleteTodoById = (username, todoId) => apiClient.delete(`/users/${username}/todos/${todoId}`);