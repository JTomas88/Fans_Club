import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../Admin/admin.module.css";
import { Context } from "../../store/appContext";

export const Fotografias = () => {
    const { store, actions } = useContext(Context);
    const [foto, setFoto] = useState ('')

    const subirFoto = async (photo) => {
        try{
            const formData = new FormData();
            formData.append("file", photo);
            const respuesta = await actions.admin_subirfoto(formData);
            setFoto(respuesta.url)
            console.log('respuesta', respuesta)
        }catch (error){
            console.error("error al subir la imagen:", error)
            return null;
        }
    }


    return (
        <div>
        <input className="form-control" type="file" id="photo" onChange={(e) => subirFoto(e.target.files[0])} />
        <button type="button" className="btn">Base class</button>

        </div>
    )
}