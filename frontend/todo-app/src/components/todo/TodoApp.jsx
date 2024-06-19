import { useState } from 'react';
import './TodoApp.css';

export default function TodoApp() {

    return (
        <div className="TodoApp">
            <Login />
        </div>
    );
}


function Login() {

    const [username, setUsername] = useState('todo');

    const [password, setPassword] = useState('');

    const [successMessage, setSuccessMessage] = useState(false);

    const [failedMessage, setFailedMessage] = useState(false);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        if (username === 'todo' && password === 't0d0') {
            setSuccessMessage(true);
            setFailedMessage(false);
        } else {
            setSuccessMessage(false);
            setFailedMessage(true);
        }
    }

    return (
        <div className="Login">
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
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );

}

