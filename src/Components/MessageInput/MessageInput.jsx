import React, { useState } from 'react'
import './MessageInput.css'

const MessageInput = ({ onEnviarMensaje, nombreCanal }) => {
    const [mensaje, setMensaje] = useState('')

    const handleChange = (e) => {
        setMensaje(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (mensaje.trim()) {
            onEnviarMensaje(mensaje)
            setMensaje('')
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className='formulario-mensaje'>
            <div className='contenedor-input-msje'>
                <div className='barra-formato'>
                    <i className="bi bi-type-bold" ></i >
                    <i className="bi bi-type-italic"></i>
                    <i className="bi bi-type-strikethrough"></i>
                    <span className='separador'></span>
                    <i className="bi bi-link-45deg"></i>
                    <span className='separador'></span>
                    <i className="bi bi-list-ol"></i>
                    <i className="bi bi-list-ul"></i>
                    <span className='separador'></span>
                    <i className="bi bi-code"></i>
                    <i className="bi bi-code-square"></i>
                </div>
                <input
                    type='text'
                    value={mensaje}
                    onChange={handleChange}
                    placeholder={`Enviar un mensaje a #${nombreCanal}`}
                    className='input-mensaje'
                />
                <div className='barra-herramientas-msje'>
                    <div className='grupo-herramientas'>
                        <button className='boton-adjuntar'>
                            <i className="bi bi-plus"></i>
                        </button>
                        <span className='separador'></span>
                        <i className="bi bi-emoji-smile"></i>
                        <i className="bi bi-at"></i>
                        <span className='separador'></span>
                        <i className="bi bi-camera-video"></i>
                        <i className="bi bi-mic"></i>
                    </div>
                    <div className='contenedor-enviar'>
                        <button type='submit' className='boton-enviar'>
                            <i className="bi bi-send"></i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default MessageInput


