import React, { useContext, useEffect } from "react";
import styles from "./jumbotron.module.css";


export const Jumbotron = ({imagenFondo, subtitulo}) => {
    return (
        <div className={`p-5 bg-body-tertiary text-center ${styles.jumbotron_edit}`} style={imagenFondo}>
        <div className={`jumbotron-content ${styles.jumbotron_content_edit}`}>
            <div className="container">
                <h1 className="display-5 fw-bold ">Club Fans Sienna</h1>
                <p className="col fs-4 text-start">{subtitulo}</p>
            </div>
        </div>
    </div>
    )
}