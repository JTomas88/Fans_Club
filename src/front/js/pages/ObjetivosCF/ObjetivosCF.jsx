import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron";
import img from "../../../assets/7.jpg"
import styles from "./objetivoscf.module.css"


export const ObjetivosCF = () => {
    return (

        <div className={`${styles.objetivoscf}`}>
            <div>
                <Jumbotron imagenFondo={{ backgroundImage: `url(${img})`, backgroundPosition: 'center 25%' }} subtitulo={"Noto esa rabia que, joder, me va y me viene"} referencia={'home'} ></Jumbotron>
            </div>
            

        </div>
    )
}