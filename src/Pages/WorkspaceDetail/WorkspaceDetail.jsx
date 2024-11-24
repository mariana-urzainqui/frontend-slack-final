import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../../Context/GlobalContext'
import { ChannelDetail, DetailHeader, SideBar, TabRail } from '../../Components'
import './WorkspaceDetail.css'


const WorkspaceDetail = () => {
    const { entornos } = useGlobalContext()
    const { id_workspace, id_canal } = useParams()
    const [searchTerm, setSearchTerm] = useState('')

    const entornoActual = entornos.find(workspace => String(workspace.id) === String(id_workspace))

    if (!entornoActual) {
        return <div>Espacio de trabajo no encontrado</div>
    }

    const canal = id_canal
        ? entornoActual.canales.find(canal => String(canal.id) === String(id_canal))
        : entornoActual.canales[0]
    if (!canal) {
        return <div>No hay canales disponibles</div>
    }

    const handleSearch = (term) => {
        setSearchTerm(term)
    }

    return (
        <div className='contenedor-workspace-detail'>
            <DetailHeader
                nombreEntorno={entornoActual.nombreEntorno}
                onSearch={handleSearch}
            />
            <div className='contenedor-principal'>
                <TabRail
                    entorno={entornoActual}
                />
                <SideBar
                    entorno={entornoActual}
                    canalSeleccionado={canal.id}
                />
                <ChannelDetail
                    canal={canal}
                    entorno={entornoActual}
                    searchTerm={searchTerm}
                />
            </div>
        </div>
    );
};

export default WorkspaceDetail
