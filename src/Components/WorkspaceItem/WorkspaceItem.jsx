import React from 'react'
import './WorkspaceItem.css'

const WorkspaceItem = ({ id_workspace, id_canal, onIniciarSlack, name, photo, members = [] }) => {
    const handleIniciarSlack = () => {
        onIniciarSlack(id_workspace, id_canal)
    }

    return (
        <div className='workspace-item-container'>
            <div className='entorno-item'>
                <div className='imagen-entorno'>
                    <img src={photo} alt={`Imagen del entorno ${name}`} />
                </div>
                <div className='detalle-entorno'>
                    <span className='nombre-entorno'>{name || 'Nombre no disponible'}</span>
                    <div className='detalle-miembros'>
                        <div className='imagenes-miembros'>
                            {members.slice(0, 3).map((miembro, index) => (
                                <img
                                    key={miembro._id || index}
                                    src={miembro.photo}
                                    alt={`Foto de ${miembro.name || 'miembro desconocido'}`}
                                />
                            ))}
                        </div>
                        <span className='cantidad-miembros'>
                            {members.length === 1 ? '1 miembro' : `${members.length} miembros`}
                        </span>
                    </div>
                </div>
            </div>
            <button className='inciar-slack-btn' onClick={handleIniciarSlack}>INICIAR SLACK</button>
        </div>
    )
}

export default WorkspaceItem
