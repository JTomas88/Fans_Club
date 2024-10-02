import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../Timeline/timeline.module.css";
import { Context } from "../../store/appContext";
import { Chrono } from "react-chrono";
import portadatragicoyfugaz from "../../../assets/portadatragicoyfugaz.jpg"
import portadatiemposdeimpacto from "../../../assets/portadatiemposdeimpacto.jpg"
import portadamelancolic from "../../../assets/portadamelancolic.jpeg"
import portadatrance from "../../../assets/portadatrance.jpg"


export const Timeline = () => {
   
    return (
        <div className="container">

        <Chrono
            items={[
                {
                    title: "2008-2009",
                    cardDetailedText: `Álex da sus prrimeros pasos como cantante en concursos infantiles. Más tarde en audiciones a ciegas de "La Voz y en castings como el del musical de "El Rey León"`,
                },
                {
                    title: "2017",
                    media: {
                        type: "IMAGE", // Añadir explícitamente el tipo de media
                        source: { url: portadatragicoyfugaz },
                    },
                    cardDetailedText: `Debut como Sienna con el álbum Trágico y fugaz`,
                },
                {
                    title: "2020",
                    media: {
                        type: "IMAGE", // Añadir explícitamente el tipo de media
                        source: { url: portadatiemposdeimpacto },
                    },
                    cardDetailedText: `Tiempos de impacto: Sienna ya forma parte del panorama musical en España`,
                },
                {
                    title: "2021",
                    media: {
                        type: "IMAGE", // Añadir explícitamente el tipo de media
                        source: { url: portadamelancolic },
                    },
                    cardDetailedText: `Se lanza Melancolic, una introspección a los sentimientos`,
                },
                {
                    title: "2024",
                    media: {
                        type: "IMAGE", // Añadir explícitamente el tipo de media
                        source: { url: portadatrance },
                    },
                    cardDetailedText: `Se publica Trance: un disco con nuevos sonidos donde se suelta la rabia más humana.`,
                },
            ]} 
            mode="VERTICAL_ALTERNATING"
            cardHeight={350} // Ajustar la altura de las tarjetas
            mediaHeight={300}
            cardWidth={350}  // Ajustar el ancho de las tarjetas (usando CSS)
            mediaClassName={`${styles.chronoMedia}`}// Aplica la clase de estilo
            cardClassName={`${styles.chronoMedi}`} //
            hideControls={true}
        />
        </div>
    )
}

