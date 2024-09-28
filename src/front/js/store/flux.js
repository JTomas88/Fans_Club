const getState = ({ getStore, getActions, setStore }) => {
    return{
        store:{
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




        actions:{
            // --Obtener todos los usuarios
            getAllUsers: async () =>{
                const store = getStore();
                try{
                    const resp = await fetch(`${store.backendUrl}/allusers`, {
                        method: "GET"
                    });
                    const data = await resp.json();
                    setStore ({usuario: data.allUsers});
                }catch (error){
                    console.log(error);
                }
            },

            // --Obtener un usuario por su id
            getUserById : async () => {
                const store = getStore();

                if (!store.userData.id){
                    console.error('Id de usuario no disponible')
                    return;
                }
                try{
                    const resp = await fetch (`${store.backendUrl}/users/${store.userData.id}`,);
                    if (!resp.ok){
                        throw new Error (`HTTP error! status: ${response.status}`);
                    }
                    const data = awat.resp.json()
                    console.log("Datos del usuario recibidos: ", data)
                    if (data){
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
                }catch (error){
                    console.error('Error al obtener los detalles del usuario', error);
                }
            },


        }
        
    }
}
export default getState;

