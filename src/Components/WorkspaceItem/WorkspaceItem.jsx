import React from 'react'
import './WorkspaceItem.css'

const WorkspaceItem = ({ entorno, id_workspace, id_canal, onIniciarSlack }) => {
const handleIniciarSlack = () => {
    onIniciarSlack(id_workspace, id_canal)
}
    return (
        <div className='workspace-item-container'>
            <div className='entorno-item'>
                <div className='imagen-entorno'>
                    <img src={entorno.fotoEntorno} alt={entorno.nombreEntorno} />
                </div>
                <div className='detalle-entorno'>
                    <span className='nombre-entorno'>{entorno.nombreEntorno}</span>
                    <div className='detalle-miembros'>
                        <div className='imagenes-miembros'>
                            {entorno.miembros.slice(0, 3).map(miembro => (
                                <img key={miembro.id} src={miembro.fotoPerfil} alt={miembro.nombreMiembro} />
                            ))}
                        </div>
                        <span className='cantidad-miembros'>
                        {entorno.miembros.length === 1 ? '1 miembro' : `${entorno.miembros.length} miembros`}
                        </span>
                    </div>
                </div>
            </div>
            <button className='inciar-slack-btn' onClick={handleIniciarSlack}>INICIAR SLACK</button>
        </div>


    )
}

export default WorkspaceItem
