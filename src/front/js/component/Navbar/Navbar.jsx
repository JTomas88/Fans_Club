import React, { useContext, useEffect } from "react";
import {Link} from "react-router-dom";

export const Navbar = () => {
    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Club Fans Oficial Sienna</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">Quién es Sienna</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Objetivos CF</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Multimedia
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Fotos</a></li>
                  <li><a class="dropdown-item" href="#">Entrevistas</a></li>                
                </ul>
              </li>             
            </ul>
            <div>
              <Link >
              <button>INICIAR SESION</button>
              </Link>
              <Link to = "/formularioRegistro">
              <button>REGÍSTRATE</button>
              </Link>             
              
            </div>
          </div>
        </div>
      </nav>
    )
}