import React from 'react'
import WorkspaceItem from '../WorkspaceItem/WorkspaceItem'
import './WorkspacesContainer.css'

const WorkspacesContainer = ({ workspaces, onIniciarSlack }) => {
    const userInfo = JSON.parse(sessionStorage.getItem('user_info'))
    const userEmail = userInfo?.email || 'Cargando...'
    return (
        <div className='workspaces-container'>
            <div className='workspaces-header'>
                <div className='titulo-header'>
                    <span>Espacios de trabajo para {userEmail}</span>
                </div>
                <div className='lista-entornos'>
                    {workspaces.map((workspace) => {
                        const firstChannel = workspace.channels && workspace.channels[0]
                        const firstChannelId = firstChannel ? firstChannel.id : null
                        return (
                            <WorkspaceItem
                                key={workspace.id}
                                workspace={workspace}
                                id_workspace={workspace.id}
                                id_canal={firstChannelId}
                                onIniciarSlack={onIniciarSlack}
                            />
                        )
                    })}
                </div>
            </div>
            <div className='crear-workspace-container'>
                <p>¿Quieres usar Slack con otro equipo?</p>
                <button className='btn-crear-nuevo'>CREAR UN NUEVO ESPACIO DE TRABAJO</button>
            </div>
        </div>
    )
}

export default WorkspacesContainer
