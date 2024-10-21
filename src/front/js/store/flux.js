const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            usuarios: [],

            userData: JSON.parse(localStorage.getItem("userData")) || {
                token: null,
                id: null,
                email: null,
                password: null,
                username: null,
                is_active: null,
                name: null,
                lastname: null,
                phone: null,
                province: null,
                town: null,
                address: null,
                role: null,
            },

            provincias: [
                "A Coruña", "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila",
                "Badajoz", "Baleares", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria",
                "Castellón", "Ceuta", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada",
                "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Jaén", "La Rioja", "Las Palmas",
                "León", "Lleida", "Lugo", "Madrid", "Málaga", "Melilla", "Murcia", "Navarra",
                "Ourense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife",
                "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia",
                "Valladolid", "Vizcaya", "Zamora", "Zaragoza"
            ],

            carpetasFotos: [], //almacena las carpetas para fotos 

            eventos: [],

            backendUrl: 'http://127.0.0.1:5000'
        },




        actions: {

            buscarlocalidad: async (query) => {
                const store = getStore()
                try{
                    const respuesta = await fetch(`${store.backendUrl}/buscar_localidad?q=${query}`, {
                        method: 'GET',
                    });
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status ${respuesta.status}`);
                    }
                    return respuesta;

                }catch(error){
                    console.error("Network error:", error);
                }
            },

            //crear carpeta desde perfil de administrador
            admin_crearCarpeta: async (formData) => {
                const store = getStore()
                try {
                    const respuesta = await fetch(`${store.backendUrl}/admin/crearcarpeta`, {
                        method: 'POST',
                        body: formData
                    });
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status ${respuesta.status}`);
                    }
                    const carpetaCreada = await respuesta.json();
                    setStore({
                        ...store,
                        carpetasFotos: [...store.carpetasFotos, carpetaCreada]
                    })
                    return carpetaCreada
                } catch (error) {
                    console.error("Network error:", error);
                    return null;
                }

            },

            //Recuperar las carpetas desde cloudinary y mostrarlas en elfront
            admin_mostrarCarpetas: async () => {
                const store = getStore();
                try {
                    const respuesta = await fetch(`${store.backendUrl}/admin/mostrarcarpetas`, {
                        method: 'GET'
                    });
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status ${respuesta.status}`);
                    }
                    const carpetas = await respuesta.json()
                    setStore({
                        ...store,
                        carpetasFotos: carpetas
                    });

                } catch (error) {
                    console.error("Error al listar carpetas:", error)
                }
            },

            //Mostrar el contenido de las carpetas de cloudinary
            admin_mostrarImagenesCarpetas: async (nombreCarpeta) => {
                const store = getStore()
                try {
                    const respuesta = await fetch(`${store.backendUrl}/admin/mostrarImagenesCarpetas/${nombreCarpeta}`, {
                        method: 'GET'
                    });
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status ${respuesta.status}`);
                    }
                    return await respuesta.json()

                } catch (error) {
                    console.error("Network error:", error);
                    return null;
                }
            },


            //subir foto desde perfil de administrador
            admin_subirfoto: async (formData) => {
                const store = getStore()
                try {
                    const respuesta = await fetch(`${store.backendUrl}/admin/subirfoto`, {
                        method: 'POST',
                        body: formData
                    });
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status ${respuesta.status}`);
                    }
                    return await respuesta.json()
                } catch (error) {
                    console.error("Network error:", error);
                    return null;
                }
            },

            //crear evento desde perfil de administrador
            admin_crearevento: async (fechaEv, poblacionEv, provinciaEv, lugarEv, horaEv, entradasEv, observacionesEv) => {
                const store = getStore();
                try {
                    const respuesta = await fetch(`${store.backendUrl}/admin/crearevento`, {
                        method: 'POST',
                        body: JSON.stringify({
                            fecha: fechaEv,
                            poblacion: poblacionEv,
                            provincia: provinciaEv,
                            lugar: lugarEv,
                            hora: horaEv,
                            entradas: entradasEv,
                            observaciones: observacionesEv
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (!respuesta.ok) {
                        const error = await respuesta.json();
                        console.error("Error:", error)
                        return error;
                    }

                    const data = await respuesta.json();


                    if (data) {
                        setStore({
                            ...store,
                            eventos: data
                        });
                        console.log("Success:", data);
                    } else {
                        console.error("Datos no recibidos:", data)
                    }
                } catch (error) {
                    console.error("Error:", error)
                }
            },

            //Función para obtener todos los eventos creados
            admin_obtenereventos: async () => {
                const store = getStore();
                try {
                    const respuesta = await fetch(`${store.backendUrl}/admin/obtenereventos`, {
                        method: 'GET'
                    });
                    const data = await respuesta.json();
                    setStore({
                        ...store,
                        eventos: data
                    });

                } catch (error) {
                    console.log(error)
                }

            },



            // --Crear nuevo usuario
            crearUsuario: async (email, username, password) => {
                const store = getStore();
                try {
                    const respuesta = await fetch(`${store.backendUrl}/registro`, {
                        method: 'POST',
                        body: JSON.stringify({ email, username, password }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const data = await respuesta.json();

                    // Si data viene con token, agrupamos los datos en un objeto llamado userData
                    if (data.access_token) {
                        const userData = {
                            token: data.access_token,
                            username: data.username,
                            email: data.email,
                            id: data.id
                        };

                        // Guardamos el objeto anterior en el localStorage, dentro de userData
                        localStorage.setItem('userData', JSON.stringify(userData))

                        // Actualizamos el store con los nuevos datos 
                        setStore({
                            ...store,
                            userData: userData
                        });
                        console.log("Datos:", data)
                    } else {
                        console.error("Error con token:", data)
                    }
                } catch (error) {
                    console.error("Error registro:", error);
                }
            },


            // --Obtener todos los usuarios
            getAllUsers: async () => {
                const store = getStore();
                try {
                    const resp = await fetch(`${store.backendUrl}/allusers`, {
                        method: "GET"
                    });
                    const data = await resp.json();
                    setStore({
                        ...store,
                        usuarios: data
                    });
                } catch (error) {
                    console.log(error);
                }
            },

            // --Obtener un usuario por su id
            getUserById: async () => {
                const store = getStore();

                if (!store.userData.id) {
                    console.error('Id de usuario no disponible')
                    return;
                }
                try {
                    const resp = await fetch(`${store.backendUrl}/users/${store.userData.id}`, {
                        method: "GET"
                    });
                    if (!resp.ok) {
                        throw new Error(`HTTP error! status: ${resp.status}`);
                    }
                    const data = await resp.json()
                    console.log("Datos del usuario recibidos: ", data)
                    if (data) {
                        const datosUsuarioDetalles = {
                            ...store.userData, //cogemos lo que hay en userData, y lo actualizamos con lo siguiente
                            email: data.email,
                            password: data.password,
                            username: data.username,
                            name: data.name || '',
                            lastname: data.lastname || '',
                            phone: data.phone || '',
                            province: data.province || '',
                            town: data.town || '',
                            address: data.address || '',

                        }
                        // Guardar el objeto en localStorage (caché del navegador)
                        localStorage.setItem('userData', JSON.stringify(datosUsuarioDetalles));

                        // Actualizamos el store
                        setStore({
                            ...store,
                            userData: datosUsuarioDetalles
                        });
                        console.log("Store actualizado: ", getStore());

                    }
                } catch (error) {
                    console.error('Error al obtener los detalles del usuario', error);
                }
            },



            // --Login a la pagina y creación de token
            login: async (email, password) => {
                const store = getStore();
                try {
                    const respuesta = await fetch(`${store.backendUrl}/login`, {
                        method: "POST",
                        body: JSON.stringify({ email, password }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const data = await respuesta.json()

                    if (data.token) {
                        const datoUsuario = {
                            token: data.token,
                            username: data.username,
                            email: data.email,
                            id: data.id,
                            role: data.role
                        };

                        // Guardamos el objeto anterior en el localStorage, dentro de userData
                        localStorage.setItem('userData', JSON.stringify(datoUsuario))

                        // Actualizamos el store con los nuevos datos 
                        setStore({
                            ...store,
                            userData: datoUsuario
                        });
                        console.log("Datos:", data)
                    } else {
                        console.error("Error con token:", data)
                    }
                } catch (error) {
                    console.error("Error login:", error);
                }


            },

            // # Editar usuario desde perfil de administrador
            admin_editar_usuario: async (id, role) => {
                const store = getStore();
                try {
                    const respuesta = await fetch(`${store.backendUrl}/admin/editar/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ role }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status: ${respuesta.status}`)
                    }
                    const data = await respuesta.json();
                    console.log("Respuesta servidor:", data)

                    //Se actualizan los datos del store. 
                    setStore({
                        ...store,
                        usuarios: store.usuarios.map(usuario => usuario.id === id ? { ...usuario, role: data.role } : usuario)
                    });

                } catch (error) {
                    console.error('No ha sido posible actualizar:', error)
                }
            },


            //Eliminar un usuario desde perfil de administrador
            admin_eliminar_usuario_: async (usuarioId) => {
                const store = getStore();

                try {
                    const respuesta = await fetch(`${store.backendUrl}/admin/eliminarusuario/${usuarioId}`, {
                        method: 'DELETE',
                    });
                    if (respuesta.ok) {
                        console.log('Usuario eliminado con éxito');
                        const usuariosactuales = store.usuarios.filter(usuario => usuario.id !== usuarioId);
                        setStore({
                            ...store,
                            usuarios: usuariosactuales
                        })
                    } else {
                        console.error('Error al eliminar al usuario')
                    }
                } catch (error) {
                    console.error('Error en la solicitud de eliminación:', error)
                }
            },

            //#Editar datos del usuario desde su perfil
            editar_usuario: async (usuarioId, email, token, username, name, lastname, phone, town, province, address) => {
                const store = getStore();
                try {
                    const respuesta = await fetch(`${store.backendUrl}/users/edit/${usuarioId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ usuarioId, email, token, username, name, lastname, phone, town, province, address }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status: ${respuesta.status}`);
                    }
                    const data = await respuesta.json();
                    const datoUsuario = {
                        token: data.token,
                        username: data.username,
                        name: data.name,
                        lastname: data.lastname,
                        email: data.email,
                        phone: data.phone,
                        id: data.usuarioId,
                        town: data.town,
                        province: data.province,
                        address: data.address
                    };

                    // Guardamos el objeto anterior en el localStorage, dentro de userData
                    localStorage.setItem('userData', JSON.stringify(datoUsuario))

                    setStore({
                        ...store,
                        usuarios: store.usuarios.map(usuario => (usuario.id === usuarioId ? data : usuario)),
                    })
                    setStore({
                        userData: datoUsuario
                    })



                } catch (error) {
                    console.error("Error al actualizar el usuario:", error)
                }

            },

            verificarpwactual: async (userId, password) => {
                const store = getStore();


                try {
                    const respuesta = await fetch(`${store.backendUrl}/verificarpwactual`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: userId,
                            password,
                        })
                    })
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status: ${respuesta.status}`);
                    }

                    const data = await respuesta.json()
                    console.log("Respues del servidor: ", data)

                    return data.isValid;
                } catch (error) {
                    console.error('Error al verificar la contraseña:', error);
                    return false;
                }

            },


            // Función que cambia la contraseña en sí
            cambiopassword: async (usuarioId, password) => {
                const store = getStore();
                const actions = getActions();
                try {
                    const respuesta = await fetch(`${store.backendUrl}/users/cambiopassword/${usuarioId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ usuarioId, password }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status: ${respuesta.status}`);
                    }
                    const data = await respuesta.json()
                    await actions.getUserById()

                    setStore({
                        usuarios: store.usuarios.map(usuario => (usuario.id === usuarioId ? data : usuario)),
                    })
                } catch (error) {
                    console.error("Error al actualizar el password:", error)
                }

            },

            //Salir
            logOut: () => {
                const store = getStore();

                localStorage.clear();
                setStore({
                    ...store,
                    userData: {
                        token: null,
                        id: '',
                        email: null,
                        username: null,
                        name: null,
                        lastname: null,
                        phone: null,
                        town: null,
                        province: null,
                        address: null
                    }
                })
            },



        }
    }
}
export default getState;

