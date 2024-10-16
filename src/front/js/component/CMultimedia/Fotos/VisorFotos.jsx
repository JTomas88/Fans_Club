import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../../store/appContext";


export const VisorFotos = ({ carpetaSeleccionada }) => {
    const { store, actions } = useContext(Context);
    console.log(carpetaSeleccionada);

    const [fotos, setFotos] = useState([])
    const [carpetaVacia, setCarpetaVacia] = useState('')
    const [mostrarCarrusel, setMostrarCarrusel] = useState(false)
    const [indFotoSelecc, setIndFotoSelecc] = useState(0)

    useEffect(() => {
        const obtenerFotos = async () => {
            if (carpetaSeleccionada) {
                const respuesta = await actions.admin_mostrarImagenesCarpetas(carpetaSeleccionada);

                if (Array.isArray(respuesta)) {
                    console.log(respuesta);
                    if (respuesta.length <= 0) {
                        setCarpetaVacia("Esta carpeta no contiene imágenes")
                    } else {
                        setFotos(respuesta)
                    }


                } else {
                    console.error("La respuesta no es un array de fotos")
                }

            }
        };
        obtenerFotos();
    }, [carpetaSeleccionada]);

    //Selecciono la foto pasándole el indice y pongo mostrar carrusel en true para que se muestre. 
    const seleccionFoto = (index) => {
        setIndFotoSelecc(index);
        setMostrarCarrusel(true);
    }

    //Para cerrar el carrusel de fotos
    const cerrarCarrusel = () => {
        setMostrarCarrusel(false)
    }







    return (
        <div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {fotos.length <= 0 && carpetaVacia ? (
                    <p style={{ color: 'red' }}>{carpetaVacia}</p>
                ) : (
                    fotos.map((foto, index) => (
                        <div key={index} style={{ margin: "10px" }}>
                            <img src={foto.secure_url}
                                alt={`Foto ${index}`}
                                style={{ width: "150px", height: "100px" }}
                                onClick={() => seleccionFoto(index)} />
                        </div>
                    ))
                )}
            </div>

            {mostrarCarrusel && (
                < div id="sliderFotos" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {fotos.map((foto, index)=>(
                            <div className={`carousel-item ${index === indFotoSelecc ? 'active' : ''}`} key={index}>
                                <img src={foto.secure_url} className="d-block w-100" alt={`Foto ${index}`} />
                            </div>
                        ))}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#sliderFotos" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#sliderFotos" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

            )}
           


        </div >
    )
}