import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import img from "../../../assets/19.jpg"
import { CPerfilUsuario } from "../../component/CPerfilUsuario/CPerfilUsuario";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron";

export const PerfilUsuario = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <Jumbotron imagenFondo={{ backgroundImage: `url(${img})`, backgroundPosition: 'center 50%' }} subtitulo={"Se desvanecerá lo efímero, lo trágico y fugaz"} referencia={'registro'} />
            <div>
                <CPerfilUsuario />
            </div>
        </>
    )
}