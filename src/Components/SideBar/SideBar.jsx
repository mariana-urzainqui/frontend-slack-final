import React, { useState, useEffect } from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import useCreateChannel from '../../Hooks/useCreateChannel'
import useChannels from '../../Hooks/useChannels'
import useForm from '../../Hooks/useForm'
import useFormValidation from '../../Hooks/useFormValidation'

const SideBar = ({ entorno, canalSeleccionado }) => {
    const { createChannel, loading, error: createChannelError, success } = useCreateChannel()
    const { form_values_state, handleChangeInputValue, clearForm } = useForm({
        channelName: ''
    })
    const { formErrors, validateForm } = useFormValidation(form_values_state, {
        validateChannelName: true,
    })
    const [formErrorsState, setFormErrorsState] = useState({})
    const [agregarNuevoCanal, setAgregarNuevoCanal] = useState(false)
    const [menuDesplegado, setMenuDesplegado] = useState(false)
    const { channels, loading: channelsLoading, error: channelsError } = useChannels(entorno._id)
    const [localChannels, setLocalChannels] = useState([])

    useEffect(() => {
        if (channels) {
            setLocalChannels(channels)
        }
    }, [channels])

    useEffect(() => {
        if (success) {
            setLocalChannels(prevChannels => [...prevChannels, success])
        }
    }, [success])

    useEffect(() => {
        const errors = validateForm()
        setFormErrorsState(errors)
    }, [form_values_state]) 

    const handleAgregarCanal = () => {
        setAgregarNuevoCanal(true)
    }

    const handleCancelar = () => {
        setAgregarNuevoCanal(false)
        clearForm()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validateForm()
        if (Object.keys(errors).length > 0) {
            setFormErrorsState(errors)
            return
        }

        await createChannel(entorno._id, form_values_state.channelName)
        setAgregarNuevoCanal(false)
        clearForm()
    }

    const toggleMenu = () => {
        setMenuDesplegado(!menuDesplegado)
    }

    const handleCanalClick = () => {
        setMenuDesplegado(false)
    }

    return (
        <div className={`side-bar ${menuDesplegado ? 'menu-abierto' : ''}`}>
            <div className='sidebar-header'>
                <span className='nombre-entorno-sb'>{entorno.workspaceName}</span>
                <button className="menu-toggle-btn" onClick={toggleMenu}>
                    <i className="bi bi-list"></i>
                </button>
            </div>
            <div className='sidebar-content'>
                <span className='canales-span'>Canales</span>
                {channelsLoading ? (
                    <div>Cargando canales...</div>
                ) : channelsError ? (
                    <div>Error: {channelsError}</div>
                ) : (
                    <ul className='lista-canales'>
                        {localChannels.map(canal => (
                            <Link 
                                to={`/workspace/${entorno._id}/${canal._id}`} 
                                key={canal._id} 
                                className='nombre-canal-sb'
                                onClick={handleCanalClick}
                            >
                                <li className={`canal-item ${canal._id === canalSeleccionado ? 'active' : ''}`}>
                                    <i className="bi bi-hash"></i>
                                    <span>{canal.channelName}</span>
                                </li>
                            </Link>
                        ))}
                        {!agregarNuevoCanal
                            ? (<li className='agregar-canal' onClick={handleAgregarCanal}>
                                <i className="bi bi-plus-lg"></i>
                                <span>Añadir canal</span>
                            </li>)
                            : (
                                <li className='agregar-canal-form'>
                                    <form onSubmit={handleSubmit}>
                                        <span className='span-form'>Añadir canal</span>
                                        <input
                                            type='text'
                                            name='channelName'
                                            value={form_values_state.channelName}
                                            onChange={handleChangeInputValue}
                                            placeholder='Nombre del nuevo canal'
                                            className='nuevo-canal-input'
                                        />
                                        {formErrorsState.channelName && <p className='error-nuevo-canal'>{formErrorsState.channelName}</p>}
                                        {createChannelError && <p className='error-nuevo-canal'>{createChannelError}</p>}
                                        <div className='botones-formulario'>
                                            <button className='confirmar-btn' type='submit' disabled={loading}>
                                                {loading ? 'Creando...' : 'Confirmar'}
                                            </button>
                                            <button className='cancelar-btn' type='button' onClick={handleCancelar}>Cancelar</button>
                                        </div>
                                    </form>
                                </li>
                            )}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default SideBar
