import React, { useEffect, useRef, useState } from 'react'
import './ChannelDetail.css'
import MessageInput from '../MessageInput/MessageInput'
import useCreateMessage from '../../Hooks/useCreateMessage'
import useMessages from '../../Hooks/useMessages'

const ChannelDetail = ({ canal, entorno, searchTerm }) => {
    const { messages, loading: messagesLoading, error: messagesError } = useMessages(canal._id)
    const { createMessage, loading: messageLoading, error: messageError, success } = useCreateMessage()
    const [localMessages, setLocalMessages] = useState([])
    const mensajesContainerRef = useRef(null)

    useEffect(() => {
        if (messages) {
            setLocalMessages(messages)
        }
    }, [messages])

    useEffect(() => {
        if (success) {
            setLocalMessages(prevMessages => [...prevMessages, success])
        }
    }, [success])

    const handleEnviarMensaje = async (contenido) => {
        if (contenido.trim()) {
            await createMessage(canal._id, contenido)
        }
    }

    const scrollAbajo = () => {
        if (mensajesContainerRef.current) {
            mensajesContainerRef.current.scrollTop = mensajesContainerRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollAbajo()
    }, [localMessages])

    const mensajesFiltrados = localMessages.filter(mensaje =>
        mensaje.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mensaje.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    let ultimaFecha = null
    
    return (
        <div className='detalle-canal'>
            <header className='header-canal'>
                <i className="bi bi-hash"></i>
                <span>{canal.channelName}</span>
            </header>
            {messagesLoading ? (
                <div>Cargando mensajes...</div>
            ) : messagesError ? (
                <div>Error: {messagesError}</div>
            ) : (
                <div className='mensajes' ref={mensajesContainerRef}>
                    {mensajesFiltrados.map(mensaje => {
                        const fecha = mensaje.createdAt.split('T')[0]
                        let mostrarFecha = false
                        if (fecha !== ultimaFecha) {
                            mostrarFecha = true
                            ultimaFecha = fecha
                        }
                        return (
                            <div key={mensaje._id}>
                                {mostrarFecha &&
                                    <div className='contenedor-fecha'>
                                        <div className='fecha'>
                                            <span className='span-fecha'>{fecha}</span>
                                        </div>
                                    </div>}
                                <div className='mensaje' >
                                    <div className='avatar-container'>
                                        <img src={mensaje.author.photo} alt={`Foto de perfil de ${mensaje.author.name}`} className='avatar-mensaje' /> {/* Asegúrate de que author.photo es una URL válida */}
                                    </div>
                                    <div className='contenido-mensaje'>
                                        <div className='mensaje-header'>
                                            <span className='autor-mensaje'>{mensaje.author.name}</span>
                                            <span className='hora-mensaje'>{new Date(mensaje.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                        <p className='texto-mensaje'>{mensaje.content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            <div className='contenedor-mensaje-input'>
                <MessageInput onEnviarMensaje={handleEnviarMensaje} nombreCanal={canal.channelName} />
            </div>
        </div>
    )
}

export default ChannelDetail

