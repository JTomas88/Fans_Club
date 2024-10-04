import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../Admin/admin.module.css";
import { Context } from "../../store/appContext";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";


export const CompGestionUsuarios = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [rol, setRol] = useState('')

    //Cargamos los usuarios al montar el componente
    useEffect(() => {
        actions.getAllUsers();
    }, []);


    const changeRole = async (id, newRole) => {
        try {
            await actions.admin_editar_usuario(id, newRole);
        } catch (error) {
            setError("Error al obtener los datos")
        }
    }

    const deleteUser = async (id) => {
        const result = await actions.admin_eliminar_usuario_(id).then(
            navigate('/admin/gestionusuarios')
        )
    }



    return (
        <div className="container-fluid">
            <div className={styles.tabla}>
                <h2>Tabla de Usuarios</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Phone</th>
                            <th>Province</th>
                            <th>Town</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th className="bg-alert">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.usuarios.map((usuario) => (
                            <tr key={usuario?.id} className={styles.tableRow}>
                                <td>{usuario?.id}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.lastname}</td>
                                <td>{usuario.phone}</td>
                                <td>{usuario.province}</td>
                                <td>{usuario.town}</td>
                                <td>{usuario.address}</td>
                                <td>
                                    <select
                                        value={usuario.role}
                                        onChange={(e) => changeRole(usuario.id, e.target.value)}
                                        className="form-select">
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#botonEliminarUsuario">
                                        <MdDelete />
                                    </button>
                                    <div class="modal fade" id="botonEliminarUsuario" tabindex="-1" aria-labelledby="botonEliminarUsuarioLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="botonEliminarUsuarioLabel">Eliminar Usuario</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    ¿Seguro que quieres eliminar a este usuario?
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>deleteUser(usuario.id)}>Si, eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}