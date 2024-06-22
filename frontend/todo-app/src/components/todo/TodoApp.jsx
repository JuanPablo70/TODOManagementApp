import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './TodoApp.css';

export default function TodoApp() {

    return (
        <div className="TodoApp">
            

            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path='/' element={ <LoginComponent /> } />
                    <Route path='/login' element={ <LoginComponent /> } />
                    <Route path='/welcome/:username' element={ <WelcomeComponent /> } />
                    <Route path='/todos' element={ <ListTodosComponent /> } />
                    <Route path='/logout' element={ <LogoutComponent /> } />

                    <Route path='*' element={ <ErrorComponent /> } />
                </Routes>
                <FooterComponent />
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
                    <button type="button" name="login" onClick={handleSubmit}>Log in</button>
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
                Manage your todos - <Link to="/todos">Go here</Link>
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

    const today = new Date();

    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());

    const todos = [
                    {id:1, description: 'Learn Angular', done: false, targetDate: targetDate},
                    {id:2, description: 'Learn Full stack dev', done: false, targetDate: targetDate},
                    {id:3, description: 'Learn MongoDB', done: false, targetDate: targetDate}
                ];

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
                                        <td>{todo.targetDate.toDateString()}</td>
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


function HeaderComponent() {

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/admin">Home</Link></li>
                            <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>
                        <li className="nav-item fs-5"><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    );

}

function FooterComponent() {

    return (
        <footer className="FooterComponent">
            <div className="container">
                Develop this project with <a className="navbar-brand" href="https://www.udemy.com/course/spring-boot-and-spring-framework-tutorial-for-beginners/">in28minutes!</a>
            </div>
        </footer>
    );

}


function LogoutComponent() {

    return (
        <div className='LogoutComponent'>
            <h1>You just Log Out</h1>
            <div>Thank you for user our app!</div>
        </div>
    );

}