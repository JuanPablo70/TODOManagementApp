import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './TodoApp.css';

export default function TodoApp() {

    return (
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <LoginComponent /> } />
                    <Route path='/login' element={ <LoginComponent /> } />
                    <Route path='/welcome/:username' element={ <WelcomeComponent /> } />
                    <Route path='/todos' element={ <ListTodosComponent /> } />

                    <Route path='*' element={ <ErrorComponent /> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}


function LoginComponent() {

    const [username, setUsername] = useState('admin');

    const [password, setPassword] = useState('');

    const [successMessage, setSuccessMessage] = useState(false);

    const [failedMessage, setFailedMessage] = useState(false);

    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        if (username === 'admin' && password === 't0d0') {
            setSuccessMessage(true);
            setFailedMessage(false);
            navigate(`/welcome/${username}`);
        } else {
            setSuccessMessage(false);
            setFailedMessage(true);
        }
    }

    return (
        <div className="LoginComponent">
            <h1>Login</h1>
            {successMessage && <div className="successMessage">Authentication successfull!</div>}
            {failedMessage && <div className="errorMessage">Authentication failed. Plase check your credentials!</div>}
            <div className="LoginForm">
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Sign in</button>
                </div>
            </div>
        </div>
    );

}


function WelcomeComponent() {

    const params = useParams();

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {params.username}</h1>
            <div>
                Welcome Component
            </div>
        </div>
    );

}


function ErrorComponent() {

    return (
        <div className='ErrorComponent'>
            <h1>404 Path not found</h1>
            <div>Please check the path.</div>
        </div>
    );

}

function ListTodosComponent() {

    const todos = [
                    {id:1, description: 'Learn Angular'},
                    {id:2, description: 'Learn Full stack dev'},
                    {id:3, description: 'Learn MongoDB'}
                ];

    return (
        <div className="ListTodosComponent">
            <h1>What you want to do!</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
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
