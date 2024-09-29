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

            backendUrl: 'http://127.0.0.1:5000'
        },




        actions: {

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
                    setStore({ usuario: data.allUsers });
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

           

            // --Login a la pagina y creación de toke
            login: async (email, password) => {
                const store = getStore();
                try {
                    const respuesta = await fetch(`${store.backendUrl}/login`, {
                        method: "POST",
                        body: JSON.stringify({email, password}),
                        headers: { "Content-Type": "application/json"}
                    });
                    const data = await respuesta.json()

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
                }catch (error){
                    console.error("Error login:", error);
                }


            }


        }

    }
}
export default getState;

