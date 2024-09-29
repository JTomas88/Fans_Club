import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./formularioregistro.module.css";
import { Context } from "../../store/appContext";

export const FormularioRegistro = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const registro = async (event, email, username, password) => {
        event.preventDefault();

        if (!email || !password || username) {
            setError("Por favor, complete todos los datos requeridos");
            return;
        }

        await actions.crearUsuario(email, username, password);
        if (store.userData.email) {
            navigate('/');
        }
    }




    return (
        <div className="container mb-5 mt-5">
            <h3 className="justify-text-center">FORMULARIO DE REGISTRO</h3>
            <div className={`${styles.boxFormulario}`}>

                <form onSubmit={(event) => registro(event, email, username, password)} >
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Correo Electronico</label>
                        <input type="email"
                            class="form-control"
                            id="inputEmail"
                            placeholder="Introduce tu correo electrónico"
                            onChange={(e) => setEmail(e.target.value)} value={email}>
                        </input>

                    </div>

                    <div class="mb-3">
                        <label for="inputUsuario" class="form-label">Nombre de usuario</label>
                        <input type="text"
                            class="form-control"
                            id="inputUsuario"
                            placeholder="Introduce un nombre de usuario"
                            onChange={(e) => setUsername(e.target.value)} value={username}>
                        </input>
                    </div>

                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Contraseña</label>
                        <input type="password"
                            class="form-control"
                            id="inputPassword"
                            onChange={(e) => setPassword(e.target.value)} value={password}>
                        </input>
                    </div>

                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Recordar mis datos</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>
    )
}