import React, { useContext, useEffect } from "react";
import styles from "../FormularioRegistro/formularioregistro.module.css";

export const FormInicioSesion = () => {
    return (
        <div className="container mb-5 mt-5">
        <h3 className="justify-text-center">FORMULARIO DE INICIO DE SESIÓN</h3>
        <div className={`${styles.boxFormulario}`}>
            <form>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Correo Electronico</label>
                    <input type="email" className="form-control" id="inputEmail" />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="inputPassword" />
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Recordar mis datos</label>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    </div>
    )
}