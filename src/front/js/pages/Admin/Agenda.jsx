import React, { useState, useContext, useEffect } from "react";
import styles from "../Admin/agenda.module.css";
import { Context } from "../../store/appContext";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";



export const Agenda = () => {
    const { store, actions } = useContext(Context);

    const [fecha, setFecha] = useState('')
    const [poblacion, setPoblacion] = useState('')
    const [provincia, setProvincia] = useState('')
    const [lugar, setLugar] = useState('')
    const [hora, setHora] = useState('')
    const [entradas, setEntradas] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [error, setError] = useState('')
    const [inputValue, setInputValue] = useState('');
    const [sugerencias, setSugerencias] = useState([]);

    const hoy = new Date().toISOString().split('T')[0];

    const changeFecha = (evento) => {
        const fechaSelecc = evento.target.value;
        setFecha(fechaSelecc);
    }

    const changePoblacion = (evento) => {
        const poblacionSelecc = evento.target.value;
        setPoblacion(poblacionSelecc)
    }

    const changeProvincia = (evento) => {
        const provinciaSelecc = evento.target.value;
        setProvincia(provinciaSelecc)
    }

    const changeLugar = (evento) => {
        const lugarSelecc = evento.target.value;
        setLugar(lugarSelecc)
    }

    const changeHora = (evento) => {
        const horaSelecc = evento.target.value;
        setHora(horaSelecc)
    }

    const changeEntradas = (evento) => {
        const entradasSelecc = evento.target.value;
        setEntradas(entradasSelecc)
    }

    const changeObservaciones = (evento) => {
        const eobservacionesSelecc = evento.target.value;
        setObservaciones(eobservacionesSelecc)
    }

    const reseteoFormulario = () => {
        setFecha('');
        setPoblacion('');
        setProvincia('');
        setLugar('');
        setHora('');
        setEntradas('');
        setObservaciones('');
        setError('');
        setSugerencias([])
    }

    const manejarCambio = async (e) => {
        const valor = e.target.value;
        setPoblacion(valor);

        if (valor.length === 0) {
            setProvincia('')
        }


        if (valor.length > 2) { // Solo buscar si hay más de 2 caracteres
            try {

                const respuesta = await actions.buscarlocalidad(valor);
                const datos = await respuesta.json();
                setSugerencias(datos);  // Guardar las sugerencias de localidades en el estado
            } catch (error) {
                console.error('Error al buscar localidades:', error);
            }
        } else {
            setSugerencias([]);  // Limpiar sugerencias si se escribe menos de 2 caracteres
        }
    };

    // Manejar selección de una localidad de la lista de sugerencias
    const manejarSeleccion = (localidad) => {
        setPoblacion(localidad.descripcion); // Coloca la localidad seleccionada en el input
        setProvincia(localidad.provincia)
        setSugerencias([]); // Limpiar las sugerencias una vez seleccionada
    };

    useEffect(() => {
        actions.admin_obtenereventos();
    }, [])

    const anadir_evento = async (evento, fecha, poblacion, provincia, lugar, hora, entradas, observaciones) => {
        evento.preventDefault()
        try {
            const resultado = await actions.admin_crearevento(fecha, poblacion, provincia, lugar, hora, entradas, observaciones)
            await actions.admin_obtenereventos()

            const modalElement = document.querySelector('[data-bs-dismiss="modal"]');
            if (modalElement) {
                modalElement.click();
            }

            reseteoFormulario()

        } catch (error) {
            console.erro("Error durante la llamada al servicio:", error);
            setError("Error al guardar los datos del evento")
        }
    }


    useEffect(() => {
        actions.buscarlocalidad()
    }, []);



    const eventos = [
        {
            fecha: "11 Octubre",
            poblacion: "Zamora",
            provincia: "Zamora",
            lugar: "La Cueva del Jazz",
            hora: "21:30",
            entradas: "https://www.wegow.com/es/conciertos/sienna-zamora-directos-vibra-mahou"
        },
        {
            fecha: "12 Octubre",
            poblacion: "Boiro",
            provincia: "A Coruña",
            lugar: "A Pousada Da Galiza	",
            hora: "Por confirmar",
            entradas: "Entrada libre"
        },
        {
            fecha: "15 Noviembre",
            poblacion: "Alicante",
            provincia: "Alicante",
            lugar: "Sala Stereo",
            hora: "22:30",
            entradas: "https://www.wegow.com/es/conciertos/sienna-en-alicante"
        },
        {
            fecha: "23 Noviembre",
            poblacion: "Zaragoza",
            provincia: "Zaragoza",
            lugar: "La Lata de las Bombillas",
            hora: "20:30",
            entradas: "https://www.wegow.com/es/conciertos/sienna-zaragoza"
        },
        {
            fecha: "27 Diciembre",
            poblacion: "Almería",
            provincia: "Almería",
            lugar: "Teatro Cervantes",
            hora: "22:30",
            entradas: "https://www.todaslasentradas.com/par-public/rest/evento/id/2781531"
        },
        {
            fecha: "07 Febrero",
            poblacion: "Sevilla",
            provincia: "Sevilla",
            lugar: "Sala Fun Club",
            hora: "22:00",
            entradas: "https://www.enterticket.es/eventos/sienna-en-sevilla-206402"
        },
        {
            fecha: "08 Febrero",
            poblacion: "Málaga",
            provincia: "Málaga",
            lugar: "Sala Marte",
            hora: "22:00",
            entradas: "https://www.enterticket.es/eventos/sienna-en-malaga-418471"
        },
        {
            fecha: "17-20 Abril",
            poblacion: "Benicàssim",
            provincia: "Alicante",
            lugar: "San San Festival",
            hora: "22:30",
            entradas: "https://sansanfestival.seetickets.com/tour/sansan-festival"
        },

    ]

    return (

        <div className="container-fluid">
            <div>
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalcrearEvento">
                    Añadir Evento
                </button>
            </div>

            {/* <!-- Modal --> */}
            <div className={`modal fade ${styles.form}`} id="modalcrearEvento" tabIndex="-1" aria-labelledby="modalcrearEventoLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Crear Evento</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className={`${styles.form}`} onSubmit={(evento) => anadir_evento(evento, fecha, poblacion, provincia, lugar, hora, entradas, observaciones)}>

                                <div className="mb-3">
                                    <label htmlFor="fecha" className="form-label">Fecha</label>
                                    <input type="date" className="form-control" id="fecha" aria-describedby="emailHelp" onChange={changeFecha} value={fecha}
                                    />
                                </div>

                                <div className="mb-3">
                                    <div>
                                        <label htmlFor="localidad" className="form-label">Localidad</label>
                                        <input
                                            type="text"
                                            value={poblacion}
                                            onChange={manejarCambio}
                                            placeholder="Escribe una localidad..."
                                            className="form-control"
                                        />
                                        {sugerencias.length > 0 && (
                                            <ul className="list-group">
                                                {sugerencias.map((localidad, index) => (
                                                    <li key={index}
                                                        className="list-group-item"
                                                        onClick={() => manejarSeleccion(localidad)}>
                                                        {localidad.descripcion}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="provincia" className="form-label">Provincia</label>
                                    <input className="form-control" disabled id="provincia" value={provincia}>
                                    </input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lugar" className="form-label">Lugar</label>
                                    <input type="text" className="form-control" id="lugar" onChange={changeLugar} value={lugar} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hora" className="form-label">Hora</label>
                                    <input type="text" className="form-control" id="hora" onChange={changeHora} value={hora} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="entradas" className="form-label">Venta de entradas</label>
                                    <input type="text" className="form-control" id="entradas" onChange={changeEntradas} value={entradas} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="observaciones" className="form-label">Observaciones</label>
                                    <textarea type="text" className="form-control" id="observaciones" onChange={changeObservaciones} value={observaciones} />
                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary">Guardar Evento</button>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>

            <div className={styles.tabla}>
                <h2>Tabla de Conciertos y Agenda</h2>
                <table className="table table bordered">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Población</th>
                            <th>Provincia</th>
                            <th>Lugar</th>
                            <th>Hora</th>
                            <th>Venta de entradas</th>
                            <th>Observaciones</th>
                            <th>Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {(Array.isArray(store.eventos) ? store.eventos : []).map((evento, index) => (
                            <tr key={index} className={styles.tableRow}>
                                <td>{evento.fecha}</td>
                                <td>{evento.poblacion}</td>
                                <td>{evento.provincia}</td>
                                <td>{evento.lugar}</td>
                                <td>{evento.hora}</td>
                                <td>{evento.entradas}</td>
                                <td>{evento.observaciones}</td>
                                <td >
                                    <LuPencil className="me-3" />
                                    <MdOutlineDelete />

                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}