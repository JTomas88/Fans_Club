import React, { useContext, useEffect } from "react";
import styles from "../FormularioRegistro/formularioregistro.module.css";

export const FormInicioSesion = () => {
    return (
        <div className="container mb-5 mt-5">
        <h3 className="justify-text-center">FORMULARIO DE INICIO DE SESIÓN</h3>
        <div className={`${styles.boxFormulario}`}>
            <form>
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Correo Electronico</label>
                    <input type="email" class="form-control" id="inputEmail" />
                </div>

                <div class="mb-3">
                    <label for="inputPassword" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="inputPassword" />
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