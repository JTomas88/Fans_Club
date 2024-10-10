import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../Admin/admin.module.css";
import { Context } from "../../store/appContext";
import img from "../../../assets/fronteyes.png";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron";
import { CompGestionUsuarios } from "./CompGestionUsuarios";


export const Admin = () => {
    return (
        <div>
            <div className={`cointainer row ${styles.body_admin}`}>

                <Link className="d-flex justify-content-center align-items-center" to="/admin/gestionusuarios">
                <button type="button" class="btn btn-light">Gestión de usuarios</button>
                </Link>

                <Link className="d-flex justify-content-center align-items-center" to="/admin/agenda">
                <button type="button" class="btn btn-light">Agenda (Gira y conciertos)</button>
                </Link>
                
                <Link className="d-flex justify-content-center align-items-center" to="/admin/fotografias">
                <button type="button" class="btn btn-light">Fotografías</button>
                </Link>


                <button type="button" class="btn btn-light">Entrevistas</button>


            </div>
        </div>

    )
}