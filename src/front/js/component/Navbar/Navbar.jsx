import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import styles from "../Navbar/navbar.module.css"


export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const logout = () => {
    actions.logOut();
    navigate('/')
  }
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
              <Link className="nav-link" to="/objetivoscf">Objetivos CF</Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Multimedia
              </a>
              <ul className="dropdown-menu">
                <Link to="/multimediafotos" >
                  <li><a className="dropdown-item" href="#">Fotos</a></li>
                </Link>

                <li><a className="dropdown-item" href="#">Entrevistas</a></li>
              </ul>
            </li>
          </ul>


          {store.userData.token ?
            <li className="dropdown">
              <button type="button" className={`${styles.font_name} btn dropdown-toggle fs-5`} data-bs-toggle="dropdown" aria-expanded="false">
                {store.userData.username}

              </button>
              <ul className="dropdown-menu">
                <Link to="/perfilusuario" >
                  <li><a className="dropdown-item" href="#">Mi perfil</a></li>
                </Link>

                <li><a className="dropdown-item" href="#" onClick={logout}>Salir</a></li>

              </ul>
            </li>


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