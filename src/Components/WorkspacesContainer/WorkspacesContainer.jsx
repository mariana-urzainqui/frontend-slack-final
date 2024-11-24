import React from 'react'
import WorkspaceItem from '../WorkspaceItem/WorkspaceItem'
import { useGlobalContext } from '../../Context/GlobalContext'
import './WorkspacesContainer.css'

const WorkspacesContainer = ({ entornos, onIniciarSlack }) => {
    const { handleCreateWorkspace, usuarioLogueado } = useGlobalContext()

    return (
        <div className='workspaces-container'>
            <div className='workspaces-header'>
                <div className='titulo-header'>
                    <span>Espacios de trabajo para {usuarioLogueado?.email || 'cargando...'} </span>
                </div>
                <div className='lista-entornos'>
                    {entornos.map((entorno) => {
                        const primerCanal = entorno.canales && entorno.canales[0];
                        const primerCanalId = primerCanal ? primerCanal.id : null;
                        return (
                            <WorkspaceItem
                                key={entorno.id}
                                entorno={entorno}
                                id_workspace={entorno.id}
                                id_canal={primerCanalId}
                                onIniciarSlack={onIniciarSlack}
                            />
                        );
                    })}
                </div>
            </div>
            <div className='crear-workspace-container'>
                <p>¿Quieres usar Slack con otro equipo?</p>
                    <button className='btn-crear-nuevo'onClick={handleCreateWorkspace}>CREAR UN NUEVO ESPACIO DE TRABAJO</button>
            </div>
        </div>
    )
}

export default WorkspacesContainer
