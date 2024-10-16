import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import styles from "./cperfilusuario.module.css";
import { IoMdConstruct } from "react-icons/io";

export const CPerfilUsuario = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState("")
    const [town, setTown] = useState("")
    const [province, setProvince] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState('') //password actual
    const [esValida, setEsValida] = useState(false);
    const [nuevaPassword, setNuevaPassword] = useState('')
    const [confNuevaPassword, setConfNuevaPassword] = useState('')
    const [datosIniciales, setDatosIniciales] = useState({
        name: '',
        lastname: '',
        phone: '',
        town: '',
        province: '',
        address: ''
    })


    const [error, setError] = useState(null)
    const [errorValidnuevapw, setErrorvalidnuevapw] = useState('')
    const [msjOK, setMsjOK] = useState(null)

    const [claseAlerta, setClaseAlerta] = useState("")

    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeLastname = (e) => setLastname(e.target.value);
    const handleChengePhone = (e) => setPhone(e.target.value);
    const handleChangeTown = (e) => setTown(e.target.value);
    const handleChangeProvince = (e) => setProvince(e.target.value);
    const handleChangeAddress = (e) => setAddress(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value) // para introducir la contraseña actual
    const handleChangeNPassword = (e)=> setNuevaPassword(e.target.value) //para introducir la 1ª vez la nueva contraseña
    const handleChangeCNPassword = (e) => setConfNuevaPassword(e.target.value) //para confirmar la nueva contraseña. 


    //Cargamos los datos del usuario si ya está registrado, si no se muestran los campos en blanco
    useEffect(() => {
        if (store.userData.id) {
            setName(store.userData.name || '');
            setLastname(store.userData.lastname || '');
            setPhone(store.userData.phone || '');
            setTown(store.userData.town || '');
            setProvince(store.userData.province || '');
            setAddress(store.userData.address || '');

            //seteamos los valores: si ya los tiene o si los tiene en blanco. 
            setDatosIniciales({
                name: name || '',
                lastname: lastname || '',
                password: password || '',
                phone: phone || '',
                town: town || '',
                province: province || '',
                address: address || ''
            })



        }
    }, [store.userData]);


    const hasChanges = (
        name !== datosIniciales.name ||
        lastname !== datosIniciales.lastname ||
        phone !== datosIniciales.phone ||
        town !== datosIniciales.town ||
        province !== datosIniciales.province ||
        address !== datosIniciales.address
    );


    //
    useEffect(() => {
        if (store.userData.id) {
            actions.getUserById()
        }
    }, [store.userData.id, store.userData.token]);


    //
    const editarDatos = async (evento) => {
        evento.preventDefault();

        if (!name || !lastname || !phone || !town || !province || !address) {
            setError("Por favor, completa todos los campos");
            return
        }

        if (store.userData.id && store.userData.token) {
            await actions.editar_usuario(store.userData.id, store.userData.email, store.userData.password, store.userData.token, store.userData.username, name, lastname, phone, town, province, address)
            setMsjOK("Has actualizado tus datos!");
            setError(null)
            setClaseAlerta(styles.alert_enter)

            setTimeout(() => {
                setClaseAlerta(styles.alert_enter_active);
            }, 50);

            setTimeout(() => {
                setClaseAlerta(styles.alert_exit_active);
            }, 3000);

            setTimeout(() => {
                setMsjOK(null);
                navigate("/");
            }, 3500);
        } else {
            console.error('No se ha encontrado al usuario')
        }
    };

    //Verificar contraseña actual: envía la contraseña actual al backend para comprobarla
    const verifPassActual = async () => {
        const isValid = await actions.verificarpwactual(store.userData.id, password);
        setEsValida(isValid);
        if (!isValid){
            setError('La contraseña actual no es correcta')
        }else{
            setError('')
        }
    }

    //para mostrar un botón u otro. 
    const validarPasswordNueva = (
        password !== store.userData.password && 
        nuevaPassword !== "" &&
        confNuevaPassword !== "" &&
        nuevaPassword === confNuevaPassword
    )

    const verificarnuevaPw = () => {
        if (nuevaPassword !== confNuevaPassword){
            setErrorvalidnuevapw('La nueva contraseña no coincide')
        }else {
            setErrorvalidnuevapw('')
        }
    }


    //---CAMBIO DE CONTRASEÑA!!!!---
    const handleClickCambioPw = async(evento) => {
        evento.preventDefault();
        try{
            await actions.cambiopassword(store.userData.id, nuevaPassword)
                
            await actions.getUserById()
            
        }catch(error){
            console.error("Error al actualizar el password:", error)
        }
    }






    return (
        <div>
            <form onSubmit={editarDatos} className="mb-4">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <p>Aquí podrás completar tu perfil o editar los datos</p>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="nombre"
                                className="form-label">Nombre</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Escribe aquí tu nombre"
                                onChange={handleChangeName}
                                value={name}
                                id="nombre" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellidos"
                                className="form-label">Apellidos</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Escribe aquí tus apellidos"
                                onChange={handleChangeLastname}
                                value={lastname}
                                id="apellidos" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email"
                                className="form-label fs-5">Email</label>
                            <input type="email"
                                className="form-control"
                                value={store.userData.email}
                                id="email" />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono"
                                className="form-label">Teléfono</label>
                            <input type="number"
                                className="form-control"
                                placeholder="Aquí va tu número, por si tenemos que contactarte!"
                                onChange={handleChengePhone}
                                value={phone}
                                id="telefono" />
                        </div>
                    </div>

                    <div className="col-md-6  d-flex flex-column">
                        <div className="mb-3">
                            <label htmlFor="localidad"
                                className="form-label">Localidad</label>
                            <input type="text"
                                className="form-control"
                                placeholder="¿Cuál es tu ciudad / pueblo?"
                                onChange={handleChangeTown}
                                value={town}
                                id="localidad" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="provincia" className="form-label fs-5">Provincia</label>
                            <select className="form-select" onChange={handleChangeProvince}
                                id="provincia" aria-label="Selecciona la provincia">
                                <option value=""
                                    disabled selected>Seleccione una provincia</option>
                                {store.provincias && store.provincias.map((provincia, index) => (
                                    <option key={index} value={provincia}>
                                        {provincia}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="direccion"
                                className="form-label">Dirección</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Aquí va tu dirección. Cuanto más completa, mejor!"
                                onChange={handleChangeAddress}
                                value={address}
                                id="direccion" />
                        </div>
                        <div>
                            {hasChanges ? (
                                <button type="submit" className="btn btn-outline-light" >Guardar datos</button>
                            ) : (
                                <button type="submit" className="btn btn-outline-light" disabled >Guardar datos</button>

                            )}
                        </div>
                    </div>

                </div>

            </form>

            {/* //Formulario para cambiar la contraseña */}
            <form onSubmit={handleClickCambioPw}>
                <p className="mb-4">Aquí podrás cambiar tu contraseña</p>
                <div className="row">
                    <div className="col">
                        <div class="mb-3">
                            <label htmlFor="actualpassword" class="form-label">Escribe aquí tu contraseña actual:</label>
                            <input type="password" 
                            class="form-control" 
                            id="actualpassword" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={verifPassActual}
                            />
                            {error && <p style={{color: 'red'}}>{error}</p>}                        
                        </div>

                        <div class="mb-3">
                            <label htmlFor="nuevapassword" class="form-label">Introduce tu nueva contraseña:</label>
                            <input type="password" 
                            class="form-control" 
                            id="nuevapassword" 
                            onChange={handleChangeNPassword} 
                            value={nuevaPassword} 
                            required disabled={!esValida}
                            />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="confnuevapassword" class="form-label">Confirma tu nueva contraseña:</label>
                            <input type="password" 
                            class="form-control" 
                            id="confnuevapassword" 
                            onChange={handleChangeCNPassword} 
                            value={confNuevaPassword}
                            required disabled={!esValida}
                            onBlur={verificarnuevaPw}
                            />
                            {errorValidnuevapw && <p style={{color: 'red'}}>{errorValidnuevapw}</p>}  
                        </div>
                    </div>
                    <div className="col">
                    <div className="align-content-center d-flex justify-content-start">

                        {validarPasswordNueva ? (
                            <button type="submit" className="btn btn-outline-light" >Cambiar contraseña</button>
                        ) : (
                            <button type="submit" className="btn btn-outline-light " disabled >Cambiar contraseña</button>

                        )}
                    </div>
                    
                    </div>                    
                </div>
                
            </form>
        </div>
    );
};
