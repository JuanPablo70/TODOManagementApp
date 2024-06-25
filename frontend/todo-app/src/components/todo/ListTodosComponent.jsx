import { useEffect, useState } from "react";
import { deleteTodoById, retrieveAllTodosByUser } from "./service/TodoApiService";

export default function ListTodosComponent() {

    const [todos, setTodos] = useState([]);
    
    const [message, setMessage] = useState(null);

    useEffect ( () => loadTodos(), [] );

    function loadTodos() {
        retrieveAllTodosByUser('admin')
            .then(response => {
                setTodos(response.data)
                }
            )
            .catch(error => console.log('error :>> ', error));
    }
    
    function deleteTodo(todoId) {
        deleteTodoById('admin', todoId)
            .then(
                () => {
                    setMessage(`Todo with id ${todoId} was deleted successfully!`);
                    loadTodos('admin');
                }
            )
            .catch(error => console.log('error :>> ', error));
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
                                        <td><button className="btn btn-warning" 
                                                    onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}
