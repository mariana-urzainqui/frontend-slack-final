import React from 'react'
import './TabRail.css'
import { USUARIO_LOGUEADO } from '../../data/dataWorkspaces'

const TabRail = ({ entorno }) => {
    const miembroLogueado = entorno.miembros.find(miembro => miembro.id === USUARIO_LOGUEADO.id)

    return (
        <nav className='tab-rail'>
                <ul className='main-menu'>
                    <li className='workspace-item'>
                        <div className='img-entorno'>
                            <img src={entorno.fotoEntorno} alt="Imagen del entorno" />
                        </div>
                    </li>
                    <li className='menu-item'>
                        <i className="bi bi-house-fill"></i>
                        <span>Inicio</span>
                    </li>
                    <li className='menu-item'>
                        <i className="bi bi-chat"></i>
                        <span>Mensajes directos</span>
                    </li>
                    <li className='menu-item'>
                        <i className="bi bi-bell"></i>
                        <span>Actividad</span>
                    </li>
                    <li className='menu-item'>
                        <i className="bi bi-bookmark"></i>
                        <span>Más tarde</span>
                    </li>
                    <li className='menu-item'>
                        <i className="bi bi-three-dots"></i>
                        <span>Más</span>
                    </li>
                </ul>
                <ul className='secondary-menu'>
                    {miembroLogueado && (
                        <li key={miembroLogueado.id} className='profile-item'>
                            <div className='contenedor-foto-usuario-tr'>
                                <img src={miembroLogueado.fotoPerfil} alt="Foto de perfil del usuario logueado" className='foto-usuario-tr' />
                            </div>
                            <span className='nombre-usuario-tr'>{miembroLogueado.nombreMiembro}</span>
                        </li>
                    )}
                </ul>
        </nav>
    )
}

export default TabRail
