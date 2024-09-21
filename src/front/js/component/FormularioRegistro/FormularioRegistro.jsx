import React, { useContext, useEffect } from "react";
import styles from "./formularioregistro.module.css";

export const FormularioRegistro = () => {
    return (
        <div className="container">
            <h3 className="justify-text-center">FORMULARIO DE REGISTRO</h3>
            <div className={`${styles.boxFormulario}`}>
                <form>
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Correo Electronico</label>
                        <input type="email" class="form-control" id="inputEmail" />
                    </div>

                    <div class="mb-3">
                        <label for="inputUsuario" class="form-label">Nombre de usuario</label>
                        <input type="text" class="form-control" id="inputUsuario" />
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