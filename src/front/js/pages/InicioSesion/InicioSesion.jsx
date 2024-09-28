import React, { useContext, useEffect } from "react";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron";
import img from "../../../assets/1.jpg"
import styles from "../Registro/registro.module.css";
import { FormInicioSesion } from "../../component/FormInicioSesion/FormInicioSesion";

export const InicioSesion = () => {
    return (
        <div className="bg-color mb-3">
            <Jumbotron imagenFondo={{ backgroundImage: `url(${img})`, backgroundPosition: 'center 10%' }} subtitulo={"Lo siento, no me arrepiento"} referencia={'registro'} />
            <div className="text-center align-items-center d-flex">
                <FormInicioSesion />
            </div>
        </div>
    )
}