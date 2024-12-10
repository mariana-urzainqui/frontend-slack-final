import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useWorkspaces from '../../Hooks/useWorkspaces'
import useChannels from '../../Hooks/useChannels'
import { ChannelDetail, DetailHeader, SideBar, TabRail } from '../../Components'
import './WorkspaceDetail.css'

const WorkspaceDetail = () => {
    const { id_workspace, id_canal } = useParams()
    const [searchTerm, setSearchTerm] = useState('')

    const { workspaces, loading: loadingWorkspaces, error: workspacesError } = useWorkspaces()
    const { channels, loading: loadingChannels, error: channelsError } = useChannels(id_workspace)

    const entornoActual = workspaces.find(workspace => String(workspace._id) === String(id_workspace))

    if (loadingWorkspaces || loadingChannels) {
        return <div>Cargando datos...</div>
    }

    if (workspacesError || channelsError) {
        return <div>Error: {workspacesError || channelsError}</div>
    }

    if (!entornoActual) {
        return <div>Espacio de trabajo no encontrado</div>
    }

    const canal = id_canal
        ? channels.find(canal => String(canal._id) === String(id_canal))
        : channels[0]

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
