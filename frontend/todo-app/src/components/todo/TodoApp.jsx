import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Style
import './style/TodoApp.css';

//Security
import AuthProvider, { useAuth } from './security/AuthContext';

//Components
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import WelcomeComponent from './WelcomeComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import TodoComponent from './TodoComponent';

function AuthenticatedRoute( {children} ) {

    const authContext = useAuth();

    if (authContext.isAuthenticated) {
        return children;
    }
    
    return <Navigate to="/" />
}

export default function TodoApp() {

    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={ <LoginComponent /> } />
                        <Route path='/login' element={ <LoginComponent /> } />
                        <Route path='/welcome/:username' element={ 
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/todos' element={ 
                            <AuthenticatedRoute>
                                <ListTodosComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/logout' element={ <LogoutComponent /> } />
                        <Route path='/todo/:id' element={ 
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='*' element={ <ErrorComponent /> } />
                    </Routes>
                    <FooterComponent />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
