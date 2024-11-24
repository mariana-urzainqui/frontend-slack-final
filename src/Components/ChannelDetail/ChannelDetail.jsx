import React, { useRef, useEffect } from 'react'
import './ChannelDetail.css'
import MessageInput from '../MessageInput/MessageInput'
import { useGlobalContext } from '../../Context/GlobalContext'


const ChannelDetail = ({ canal, entorno, searchTerm }) => {
    const { agregarMensaje } = useGlobalContext()
    const mensajesContainerRef = useRef(null)

    const obtenerFotoAutor = (autor) => {
        const miembro = entorno.miembros.find(miembro => miembro.nombreMiembro === autor)
        return miembro ? miembro.fotoPerfil : ''
    }

    const handleEnviarMensaje = (contenido) => {
        if (contenido.trim()) {
            agregarMensaje(entorno.id, canal.id, contenido)
        }
    }

    const scrollAbajo = () => {
        if (mensajesContainerRef.current) {
            mensajesContainerRef.current.scrollTop = mensajesContainerRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollAbajo()
    }, [canal.mensajes])

    const mensajesFiltrados = canal.mensajes.filter(mensaje =>
        mensaje.contenido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mensaje.autor.toLowerCase().includes(searchTerm.toLowerCase())
    )

    let ultimaFecha = null
    
    return (
        <div className='detalle-canal'>
            <header className='header-canal'>
                <i className="bi bi-hash"></i>
                <span>{canal.nombreCanal}</span>
            </header>
            <div className='mensajes' ref={mensajesContainerRef}>
                {mensajesFiltrados.map(mensaje => {
                    const fecha = mensaje.fecha
                    let mostrarFecha = false
                    if (fecha !== ultimaFecha) {
                        mostrarFecha = true
                        ultimaFecha = fecha
                    }
                    return (
                        <div key={mensaje.id}>
                            {mostrarFecha &&
                                <div className='contenedor-fecha'>
                                    <div className='fecha'>
                                        <span className='span-fecha'>{fecha}</span>
                                    </div>
                                </div>}
                            <div className='mensaje' >
                                <div className='avatar-container'>
                                    <img src={obtenerFotoAutor(mensaje.autor)} alt={`Foto de perfil de ${mensaje.autor}`} className='avatar-mensaje' />
                                </div>
                                <div className='contenido-mensaje'>
                                    <div className='mensaje-header'>
                                        <span className='autor-mensaje'>{mensaje.autor}</span>
                                        <span className='hora-mensaje'>{mensaje.hora}</span>
                                    </div>
                                    <p className='texto-mensaje'>{mensaje.contenido}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='contenedor-mensaje-input'>
                <MessageInput onEnviarMensaje={handleEnviarMensaje} nombreCanal={canal.nombreCanal} />
            </div>
        </div>
    )
}

export default ChannelDetail
