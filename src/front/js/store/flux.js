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

            carpetasFotos: [], //almacena las carpetas para fotos 

            backendUrl: 'http://127.0.0.1:5000'
        },




        actions: {

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
                        const userData = {
                            token: data.token,
                            username: data.username,
                            email: data.email,
                            id: data.id,
                            role: data.role
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



        }
    }
}
export default getState;

