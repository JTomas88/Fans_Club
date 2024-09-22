import React, { useContext, useEffect } from "react";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron";
import img from "../../../assets/1.jpg"
import styles from "./registro.module.css";
import { FormularioRegistro } from "../../component/FormularioRegistro/FormularioRegistro";

export const Registro = () => {
    return (
      <div className="bg-color mb-3">
      <Jumbotron imagenFondo={{ backgroundImage: `url(${img})`, backgroundPosition:'center 10%'}} subtitulo={"Lo siento, no me arrepiento"} />
      <div className="text-center align-items-center d-flex">
      <FormularioRegistro/>
      </div>      
      </div>
    )
}