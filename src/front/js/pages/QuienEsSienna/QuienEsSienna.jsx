import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../QuienEsSienna/quienessienna.module.css";
import { Context } from "../../store/appContext";
import { Quien } from "../../component/Quien/Quien";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron";
import { Timeline } from "../../component/Timeline/Timeline";
import img from "../../../assets/20.jpg";

export const QuienEsSienna = () => {
    return (
        <div className="bg-color mb-3">
            <div>
                <Jumbotron imagenFondo={{ backgroundImage: `url(${img})`, backgroundPosition: 'center 23%' }} subtitulo={"Y sin embargo, solo te noto a ti"} referencia={'home'} ></Jumbotron>
            </div>
            <div>
                <Quien />
            </div>

            <div>
                <Timeline />
            </div>
        </div>

    )
}