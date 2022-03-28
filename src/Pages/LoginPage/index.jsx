import { useContext, useState } from "react";
import "./style.css";
import { AuthContext } from "../../Contexts/auth";

export const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState('');

    const handleLogin = async() => {
        login(email, password);
    }


    return(
        <div id="Login">
            <h1 className="title">Login</h1>
            <div className="form">
                <div className="filed">
                   <label htmlFor="email">Email</label>
                   <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }
                   />
                </div>
                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button onClick={ handleLogin }>Entrar</button>
                </div>
            </div>
        </div>
    );
}