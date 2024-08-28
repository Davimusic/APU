'use client';

import { useState } from 'react';
import '../estilos/login.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {updateCorreo, updateAccion } from "@/funciones/redux/actions";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword2, setShowPassword2] = useState(false);

    const correo = useSelector(state => state.correo)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === password2){
            console.log({ email, password });
            dispatch(updateCorreo(email))
            dispatch(updateAccion('mostrarProyectos'))
        } else {
            alert('contraseñas incorrectas, no coinciden')
        }
    };

    const handleCheckboxChange = (e) => {
        setShowPassword2(e.target.checked)
        alert(`Checkbox is ${e.target.checked ? 'true' : 'false'}`);
    };

    return (
        <div className="container">
            <div className="loginBox">
                <h2 className="title">Login</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password" className="label">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {showPassword2 && (
                        <div className="inputGroup2">
                            <label htmlFor="password2" className="label">Rewrite Password</label>
                            <input
                                id="password2"
                                name="password2"
                                type="password"
                                required
                                className="input"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="inputGroup">
                        <input
                            id="noAccount"
                            name="noAccount"
                            type="checkbox"
                            className="checkbox"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="noAccount" className="label">¿No tienes cuenta?</label>
                    </div>
                    <div>
                        <button type="submit" className="button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
