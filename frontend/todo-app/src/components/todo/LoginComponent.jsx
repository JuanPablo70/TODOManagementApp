import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginComponent() {

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
                    <button type="button" name="login" onClick={handleSubmit}>Log in</button>
                </div>
            </div>
        </div>
    );

}