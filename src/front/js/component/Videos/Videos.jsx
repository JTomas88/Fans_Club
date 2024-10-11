import React, { useContext, useEffect, useState } from "react";
import styles from "./videos.module.css"

export const Videos = () => {
    const [enlaces, setEnlaces] = useState('');

    const seleccionClick = (enlace) => {
        setEnlaces(enlace)
    }



    return (
        <div className="container mt-5">
            <div className={`${styles.tranceVideos} justify-content-center align-items-center d-flex mb-5`} >
                TRANCE VIDEOS
            </div>
            <div className={`row ${styles.contenedor}`}>
                <div className={`col-6 ${styles.canciones}`}>
            
                    <ul>
                        <li> <a onClick={() => seleccionClick('https://www.youtube.com/embed/0qEnQmvJ_nY?si=TIC5jR2Y1AcAbOag')}> Creí que era eterno </a></li>
                        <li> <a onClick={() => seleccionClick("https://www.youtube.com/embed/oe53HQUuLOo?si=MfD7LBouYOhtTG22")}> Como un animal </a></li>
                        <li> <a onClick={() => seleccionClick('https://www.youtube.com/embed/lFThDfOLfuw?si=UvrO6EztR7PP5rpd')}> Fuera (x3) </a></li>
                        <li> <a onClick={() => seleccionClick("https://www.youtube.com/embed/nLTVNPHoeaQ?si=RydnWjv24We3tnBz")}> Cristales en mi mente</a></li>
                        <li> <a onClick={() => seleccionClick("https://www.youtube.com/embed/duwFCGCozJM?si=_OBZCMzIVAHhfEbT")}> Un poco cabrón </a></li>
                        <li> <a onClick={() => seleccionClick("https://www.youtube.com/embed/1oE3gFWVvUc?si=uov33rNB80BTl7A8")}> Tengo que soltar </a></li>
                        <li> <a onClick={() => seleccionClick("https://www.youtube.com/embed/MvCpIp4_2XE?si=rMsVFcciiMfP6O3H")}> Siempre es lo mismo </a></li>
                        <li> <a onClick={() => seleccionClick("https://www.youtube.com/embed/CQ6MuTnah64?si=sZimXX6BvR_TllmU")}> Tu fiel jodida mitad </a></li>
                        <li> <a onClick={() => seleccionClick("https://www.youtube.com/embed/XEE7iUa_UjQ?si=_1ofSyCUyIAm1wSz")}> Esto no es el cielo </a></li>
                        <li> <a onClick={() => seleccionClick("https://www.youtube.com/embed/IFongdRgrF0?si=9pezlhz8JtAIJN2E")}> No se puede frenar </a></li>

                    </ul>
                </div>

                <div className="col-6 justify-content-end d-flex">
                    <iframe width="860" height="315" src={enlaces} title="Hola" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    )
}