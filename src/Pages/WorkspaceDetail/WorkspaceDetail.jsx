import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useWorkspaces from '../../Hooks/useWorkspaces'
import { ChannelDetail, DetailHeader, SideBar, TabRail } from '../../Components'
import './WorkspaceDetail.css'

const WorkspaceDetail = () => {
    const { id_workspace, id_canal } = useParams()
    const [searchTerm, setSearchTerm] = useState('')

    const { workspaces, loading: loadingWorkspaces, error: workspacesError } = useWorkspaces()


    const entornoActual = workspaces.find(workspace => String(workspace._id) === String(id_workspace))

    if (loadingWorkspaces) {
        return <div className='mensaje-cargando'>Cargando datos...</div>
    }

    if (workspacesError) {
        return <div className='mensaje-error'>Error: {workspacesError}</div>
    }

    if (!entornoActual) {
        return <div className='mensaje-error'>Espacio de trabajo no encontrado</div>
    }

    const canal = id_canal
        ? entornoActual.channels.find(canal => String(canal._id) === String(id_canal))
        : entornoActual.channels[0]

    if (!canal) {
        return <div>No hay canales disponibles</div>
    }

    const handleSearch = (term) => {
        setSearchTerm(term)
    }

    return (
        <div className='contenedor-workspace-detail'>
            <DetailHeader
                nombreEntorno={entornoActual.workspaceName}
                onSearch={handleSearch}
            />
            <div className='contenedor-principal'>
                <TabRail
                    entorno={entornoActual}
                />
                <SideBar
                    entorno={entornoActual}
                    canalSeleccionado={canal._id}
                />
                <ChannelDetail
                    canal={canal}
                    entorno={entornoActual}
                    searchTerm={searchTerm}
                />
            </div>
        </div>
    )
}

export default WorkspaceDetail