import React from 'react'
import './NewWorkspace.css'
import { WorkspaceForm } from '../../Components'

const NewWorkspace = () => {
    return (
        <div className='nuevo-entorno-container'>
            <div className='logo-container-nuevo-workspace'>
                <img src="/assets/images/slack-logo.png" alt="Logo de slack" />
            </div>
            <div className='content-container'>
                <div className='form-container'>
                    <h1>Crea un nuevo espacio de trabajo de Slack</h1>
                    <WorkspaceForm />
                </div>
                <div className='nuevo-worspace-img'>
                    <img src="/assets/images/new-workspace.png" alt="Compañeros de trabajo interactuando" />
                </div>
            </div>
        </div>
    )
}

export default NewWorkspace
