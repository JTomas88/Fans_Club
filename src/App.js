import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './front/js/component/Navbar/Navbar';
import { Jumbotron } from './front/js/component/Jumbotron/Jumbotron';
import { Registro } from './front/js/pages/Registro/Registro';
import { Footer } from './front/js/component/Footer/Footer';
import { Home } from './front/js/pages/Home/Home';
import { FormInicioSesion } from './front/js/component/FormInicioSesion/FormInicioSesion';
import { InicioSesion } from './front/js/pages/InicioSesion/InicioSesion';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="App-content">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/formularioRegistro" element={<Registro />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
      </Routes>
    </div>
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
