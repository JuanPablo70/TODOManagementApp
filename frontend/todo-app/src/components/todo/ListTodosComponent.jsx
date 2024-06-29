import { useEffect, useState } from "react";
import { deleteTodoById, getAllTodosByUser } from "./service/TodoApiService";
import { useAuth } from './security/AuthContext';
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {

    const authContext = useAuth();

    const [todos, setTodos] = useState([]);
    
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    useEffect ( () => loadTodos(), [] );

    function loadTodos() {
        getAllTodosByUser(authContext.username)
            .then(response => {
                setTodos(response.data);
                }
            )
            .catch(error => console.log('error :>> ', error));
    }
    
    function deleteTodo(todoId) {
        deleteTodoById(authContext.username, todoId)
            .then(
                () => {
                    setMessage(`Todo with id ${todoId} was deleted successfully!`);
                    loadTodos();
                }
            )
            .catch(error => console.log('error :>> ', error));
    }

    function updateTodo(todoId) {
        navigate(`/todo/${todoId}`);
    }

    function addNewTodo() {
        navigate('/todo/-1');
    }

    return (
        <div className="container">
            <h1>What you want to do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Done</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-success" 
                                                    onClick={() => updateTodo(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" 
                                                    onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <button className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</button>
            </div>
        </div>
    );

}
