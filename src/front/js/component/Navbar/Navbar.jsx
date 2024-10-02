import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Club Fans Oficial Sienna</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/quienesSienna">Quién es Sienna</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Objetivos CF</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Multimedia
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Fotos</a></li>
                <li><a className="dropdown-item" href="#">Entrevistas</a></li>
              </ul>
            </li>
          </ul>


          {store.userData.token ?
            <button type="button" className={`btn dropdown-toggle fs-5`} aria-expanded="false">
              <span className="fa-solid fa-user pe-2"></span>{store.userData.username}
            </button>
            :
            <div>
              <Link to="/inicioSesion" >
                <button>INICIAR SESION</button>
              </Link>

              <Link to="/formularioRegistro">
                <button>REGÍSTRATE</button>
              </Link>
            </div>
          }







        </div>
      </div>
    </nav>
  )
}