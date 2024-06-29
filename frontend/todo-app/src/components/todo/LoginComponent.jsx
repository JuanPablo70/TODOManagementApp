import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function LoginComponent() {

    const [username, setUsername] = useState('admin');

    const [password, setPassword] = useState('');

    const [failedMessage, setFailedMessage] = useState(false);

    const navigate = useNavigate();

    const authContext = useAuth();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit() {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
        } else {
            setFailedMessage(true);
        }
    }

    return (
        <div className="LoginComponent">
            <h1>Login</h1>
            {failedMessage && <div className="errorMessage">Authentication failed. Please check your credentials!</div>}
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
                    <button type="button" name="login" onClick={handleSubmit}>Log in</button>
                </div>
            </div>
        </div>
    );

}