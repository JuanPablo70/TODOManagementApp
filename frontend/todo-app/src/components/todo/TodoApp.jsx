import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './TodoApp.css';

export default function TodoApp() {

    return (
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Login /> }></Route>
                    <Route path='/login' element={ <Login /> }></Route>
                    <Route path='/welcome/:username' element={ <Welcome /> }></Route>
                    <Route path='*' element={ <Error /> }></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


function Login() {

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
        <div className="Login">
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


function Welcome() {

    const params = useParams();

    return (
        <div className='Welcome'>
            <h1>Welcome {params.username}</h1>
            <div>
                Welcome Component
            </div>
        </div>
    );

}


function Error() {

    return (
        <div className='Error'>
            <h1>404 Path not found</h1>
            <div>Please check the path.</div>
        </div>
    );

}
