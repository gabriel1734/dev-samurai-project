import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../Services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        const response = await createSession(email, password);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user);

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`

        navigate('/');
        setLoading(false);
    }


    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if(user){
            setUser(JSON.parse(user));
            api.defaults.headers.Authorization = `Bearer ${token}`;
            navigate('/');
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider 
            value={{
                authenticated: !!user,
                user,
                loading,
                login, 
                logout
            }}
        >
            {children}     
        </AuthContext.Provider>
    );
}