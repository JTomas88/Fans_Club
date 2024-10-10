import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../../store/appContext";
import { GiMicrophone } from "react-icons/gi";



export const Carpetas = ({setCarpetaSeleccionada}) => {
    const { store, actions } = useContext(Context);
    const [carpetaClicada, setCarpetaClicada] = useState(null);




    //Llamo a la función para mostrar las carpetas cuando el componente se cargue.
    useEffect(() => {
        actions.admin_mostrarCarpetas();
    }, []);


    const seleccionarCarpeta = (carpeta) => {
        setCarpetaSeleccionada(carpeta.name);
        setCarpetaClicada(carpeta.name)
    };



return (
    <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
                {Array.isArray(store.carpetasFotos) && store.carpetasFotos.length > 0 ? (
                    store.carpetasFotos.map((carpeta, index) => (
                        <div
                            key={index}
                            onClick={() => seleccionarCarpeta(carpeta)} //Click simple selecciona la carpeta
                            style={{
                                border: carpetaClicada === carpeta.name ? "5px solid blue" : "none",
                                padding: "10px",
                                margin: "10px",
                                textAlign: "center",
                                width: "120px",
                                cursor: "pointer",
                                color: "white",
                            }}
                            

                        >
                            <GiMicrophone   size={50} color="white"/>
                            <p>{carpeta.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay carpetas creadas.</p>
                )}
            </div>
    </div>
    
)
}