import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import injectContext from "./front/js/store/appContext";
import './App.css';
import { Navbar } from './front/js/component/Navbar/Navbar';
import { Jumbotron } from './front/js/component/Jumbotron/Jumbotron';
import { Registro } from './front/js/pages/Registro/Registro';
import { Footer } from './front/js/component/Footer/Footer';
import { Home } from './front/js/pages/Home/Home';
import { FormInicioSesion } from './front/js/component/FormInicioSesion/FormInicioSesion';
import { InicioSesion } from './front/js/pages/InicioSesion/InicioSesion';
import { QuienEsSienna } from './front/js/pages/QuienEsSienna/QuienEsSienna';
import { Timeline } from './front/js/component/Timeline/Timeline';
import { Admin } from './front/js/pages/Admin/Admin';
import { CompGestionUsuarios } from './front/js/pages/Admin/CompGestionUsuarios';
import { Agenda } from './front/js/pages/Admin/Agenda';
import { Fotografias } from './front/js/pages/Admin/Fotografias';
import { MultimediaFotos } from './front/js/pages/Multimedia/MultimediaFotos';
import { ObjetivosCF } from './front/js/pages/ObjetivosCF/ObjetivosCF';
import { CPerfilUsuario } from './front/js/component/CPerfilUsuario/CPerfilUsuario';
import { PerfilUsuario } from './front/js/pages/PerfilUsuario/PerfilUsuario';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="App-content">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/formularioRegistro" element={<Registro />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route path= "/quienesSienna" element={<QuienEsSienna />} />
        <Route path= "/timeline" element={<Timeline />} />
        <Route path= "/admin" element={<Admin />} />
        <Route path= "/admin/gestionusuarios" element={<CompGestionUsuarios />} />
        <Route path= "/admin/agenda" element={<Agenda />} />
        <Route path= "/admin/fotografias" element={<Fotografias />} />
        <Route path= "/multimediafotos" element={<MultimediaFotos />} />
        <Route path= "/objetivoscf" element={<ObjetivosCF />} />
        <Route path= "/perfilusuario" element={<PerfilUsuario />} />











      </Routes>
    </div>
    <Footer/>
  </BrowserRouter>
  );
}

export default injectContext (App);
