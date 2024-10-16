'use client';

import { useState, useEffect } from 'react';
import '../estilos/login.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {updateCorreo, updateAccion, updateMateriales } from "@/funciones/redux/actions";
import materialesTesteo from './materialesTesteo';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword2, setShowPassword2] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchMaterials()
        //dispatch(updateMateriales(materialesTesteo()))
        //console.log(materialesTesteo);
        
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await fetch('/api/getMaterials', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const message = `An error has occurred: ${response.status}`;
                throw new Error(message);
            }
    
            const materials = await response.json();
            console.log(materials);
    
            if (materials) {
                // Aquí puedes hacer algo con los materiales recibidos
                dispatch(updateMateriales(materials[0].materiales))
                console.log(materials[0].materiales);
            }
        } catch (error) {
            console.error('Error al obtener los materiales:', error);
        }
    };
    

    const fetchData = async (correo, contrasena) => {
        try {
            //const correo = 'davipianof@gmail.com'; // Reemplaza con el correo del usuario
            //const contrasena = 'aaaa'; // Reemplaza con la contraseña del usuario
            const res = await verificarCredenciales(correo, contrasena);
            if (res) {
                console.log(res);
                if(res['loginState']){
                    localStorage.setItem('email', correo)
                    dispatch(updateCorreo(email))
                    dispatch(updateAccion('mostrarProyectos'))
                }
            }
        } catch (error) {
            console.error('Error durante la verificación:', error);
        }
    };

    async function verificarCredenciales(correo, contrasena) {
        try {
            const response = await fetch('/api/validateAcces', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contrasena }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Contraseña incorrecta');
                    return { error: 'Contraseña incorrecta' };
                }
                if (response.status === 404) {
                    console.error('Correo no encontrado');
                    return { error: 'Correo no encontrado' };
                }
                const message = `An error has occurred: ${response.status}`;
                throw new Error(message);
            }

            const result = await response.json();
            console.log(result);

            if (result.success) {
                return result.keys;
            }

            return result;
        } catch (error) {
            console.error('Error al verificar las credenciales:', error);
        }
    }

    async function createUser(correo, contrasena) {
        try {
          const response = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, contrasena }),
          });
      
          if (!response.ok) {
            if (response.status === 409) {
              console.error('Correo existente');
              alert('Correo existente')
              return { error: 'Correo existente' };
            }
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
          }
      
          const result = await response.json();
          console.log(result);
          alert('usuario creado exitosamente')
      
          if (result.message === 'Usuario creado') {
            return { success: 'Usuario creado' };
          }
      
          return result;
        } catch (error) {
          console.error('Error al crear el usuario:', error);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(showPassword2 === true){
            if(password === password2){
                console.log({ email, password });
                createUser(email, password)
                /*dispatch(updateCorreo(email))
                dispatch(updateAccion('mostrarProyectos'))*/
            } else {
                alert('contraseñas incorrectas, no coinciden')
            }
        } else {

            fetchData(email, password)
            //dispatch(updateCorreo(email))
            //dispatch(updateAccion('mostrarProyectos'))
        }
    };

    const handleCheckboxChange = (e) => {
        setShowPassword2(e.target.checked)
        //alert(`Checkbox is ${e.target.checked ? 'true' : 'false'}`);
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
