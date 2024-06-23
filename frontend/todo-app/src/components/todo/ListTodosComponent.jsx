import { useEffect, useState } from "react";
import { retrieveAllTodosByUser } from "./service/TodoApiService";

export default function ListTodosComponent() {

    const [todos, setTodos] = useState([]);

    useEffect ( () => refreshTodos(), [] );

    function refreshTodos() {
        retrieveAllTodosByUser('admin')
            .then(response => {
                setTodos(response.data)
                }
            )
            .catch(error => console.log('error :>> ', error));
    }

    return (
        <div className="container">
            <h1>What you want to do!</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Description</td>
                            <td>is done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
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
