import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../Admin/admin.module.css";
import { Context } from "../../store/appContext";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export const Agenda = () => {
    const { store, actions } = useContext(Context);

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
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map((evento, index) => (
                            <tr key={index} className={styles.tableRow}>
                                <td>{evento.fecha}</td>
                                <td>{evento.poblacion}</td>
                                <td>{evento.provincia}</td>
                                <td>{evento.lugar}</td>
                                <td>{evento.hora}</td>
                                <td>{evento.entradas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}