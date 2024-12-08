import React, { useEffect, useState } from 'react'
import WorkspaceItem from '../WorkspaceItem/WorkspaceItem'
import { useGlobalContext } from '../../Context/GlobalContext'
import './WorkspacesContainer.css'

const WorkspacesContainer = ({ entornos, onIniciarSlack, error }) => {
    const { handleCreateWorkspace } = useGlobalContext()
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        const userInfo = sessionStorage.getItem('user_info')
        if(userInfo){
            try{
                const user = JSON.parse(userInfo)
                setUserEmail(user.email || 'Usuario desconocido')
            }
            catch(error){
                console.error('Error al parsear la información del usuario:', error)
            }
        }
    }, [])

    return (
        <div className='workspaces-container'>
            <div className='workspaces-header'>
                <div className='titulo-header'>
                    <span>Espacios de trabajo para {userEmail} </span>
                </div>
                <div className='lista-entornos'>
                    {entornos.length > 0 
                    ? (
                        entornos.map((entorno) => {
                            const primerCanal = entorno.channels && entorno.channels[0];
                            const primerCanalId = primerCanal ? primerCanal._id : null;
                            return (
                                <WorkspaceItem
                                key={entorno._id} 
                                id_workspace={entorno._id} 
                                id_canal={primerCanalId} 
                                onIniciarSlack={onIniciarSlack} 
                                name={entorno.workspaceName} 
                                photo={entorno.workspacePhoto}
                                members={entorno.members}
                                />
                            )
                        })
                    )
                    : (
                        <p className='error-message-wc'>{error}</p>
                    )}            
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