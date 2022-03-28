import { Children, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './Contexts/auth';
import { Login } from './Pages/LoginPage';
import { MainPage } from './Pages/MainPage';


export const AppRoutes = () => {
    const Private = ({ children }) => {
        
        const { authenticated, loading } = useContext(AuthContext);

        if(loading){
            return <div className="loading">Carregando....</div>
        }
        
        if(!authenticated) {
            return <Navigate to="/login"/>
        }

        return children;
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route 
                        exact path="/" 
                        element={<Private><MainPage /></Private>}
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}