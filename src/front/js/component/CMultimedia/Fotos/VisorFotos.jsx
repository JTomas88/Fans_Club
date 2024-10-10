import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../../store/appContext";


export const VisorFotos = ({ carpetaSeleccionada }) => {
    const { store, actions } = useContext(Context);
    console.log(carpetaSeleccionada);

    const [fotos, setFotos] = useState([])

    useEffect(() => {
        const obtenerFotos = async () => {
            if (carpetaSeleccionada) {
                const respuesta = await actions.admin_mostrarImagenesCarpetas(carpetaSeleccionada);

                if(Array.isArray(respuesta)){
                    setFotos(respuesta)
                }else{
                    console.error("La respuesta no es un array de fotos")
                }

            }
        };
        obtenerFotos();
    }, [carpetaSeleccionada]);



    return (
        <div>
            {fotos.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {fotos.map((foto, index) => (
                        <div key={index} style={{ margin: "10px" }}>
                            <img src={foto.secure_url} alt={`Foto ${index}`} style={{ width: "150px", height: "100px" }} />
                        </div>

                    ))}

                </div>
            ) : (
                <p>Selecciona una carpeta para ver las fotos</p>
            )}
        </div>
    )
}