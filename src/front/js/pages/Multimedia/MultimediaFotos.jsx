import React, { useState } from "react";
import styles from "../Multimedia/mutimediaFotos.module.css";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron";
import img from "../../../assets/3.jpg"
import { Carpetas } from "../../component/CMultimedia/Fotos/Carpetas";
import { VisorFotos } from "../../component/CMultimedia/Fotos/VisorFotos";

export const MultimediaFotos = () => {
    const [carpetaSeleccionada, setCarpetaSeleccionada] = useState(null); // Estado para la carpeta seleccionada

    return (
        <>
            <div>
                <Jumbotron imagenFondo={{ backgroundImage: `url(${img})`, backgroundPosition: 'center 15%' }} subtitulo={"Tal vez sólo hay sombras y formas"} referencia={'foto'} ></Jumbotron>
            </div>
            <div className="container justify-content-center align-items-center text-center">
                <div className={`${styles.titulo}`}>
                    <h1 className={`${styles.titulo}`}>FOTOS</h1>                    
                </div>
                <p className="text-center">Selecciona una carpeta para ver las fotos</p>

                {/* Pasamos la función setCarpetaSeleccionada a Carpetas para actualizar el estado */}
                <div>
                    <Carpetas setCarpetaSeleccionada={setCarpetaSeleccionada} />
                </div>

                {/* Pasamos la carpeta seleccionada a VisorFotos */}
                <div>
                    <VisorFotos carpetaSeleccionada={carpetaSeleccionada} />
                </div>



            </div>
        </>
    )
}