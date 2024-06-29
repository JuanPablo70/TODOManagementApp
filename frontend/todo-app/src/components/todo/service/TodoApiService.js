import { apiClient } from './ApiClient';


export const getAllTodosByUser = (username) => apiClient.get(`/users/${username}/todos`);

export const deleteTodoById = (username, todoId) => apiClient.delete(`/users/${username}/todos/${todoId}`);

export const getTodoById = (username, todoId) => apiClient.get(`/users/${username}/todos/${todoId}`);

export const updateTodoById = (username, todoId, todoDetails) => apiClient.put(`/users/${username}/todos/${todoId}`, todoDetails);

export const createTodo = (username, todoDetails) => apiClient.post(`/users/${username}/todos`, todoDetails);
