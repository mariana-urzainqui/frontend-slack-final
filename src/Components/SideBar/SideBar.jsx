import React, { useState } from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../Context/GlobalContext'
import { validarForm } from '../../helpers/validationHelpers'

const SideBar = ({ entorno, canalSeleccionado }) => {
    const { agregarCanal } = useGlobalContext()
    const [agregarNuevoCanal, setAgregarNuevoCanal] = useState(false)
    const [nombreNuevoCanal, setNombreNuevoCanal] = useState('')
    const [error, setError] = useState('')
    const [menuDesplegado, setMenuDesplegado] = useState(false)

    const handleAgregarCanal = () => {
        setAgregarNuevoCanal(true)
    }

    const handleCancelar = () => {
        setAgregarNuevoCanal(false)
        setNombreNuevoCanal('')
        setError('')
    }

    const handleCambioInput = (e) => {
        setNombreNuevoCanal(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validarForm('', nombreNuevoCanal)
        if (errors.nombreCanal) {
            setError(errors.nombreCanal)
            return
        }
        agregarCanal(entorno.id, nombreNuevoCanal)
        setAgregarNuevoCanal(false)
        setNombreNuevoCanal('')
        setError('')
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
                <span className='nombre-entorno-sb'>{entorno.nombreEntorno}</span>
                <button className="menu-toggle-btn" onClick={toggleMenu}>
                    <i className="bi bi-list"></i>
                </button>
            </div>
            <div className='sidebar-content'>
                <span className='canales-span'>Canales</span>
                <ul className='lista-canales'>
                    {entorno.canales.map(canal => (
                        <Link 
                        to={`/workspace/${entorno.id}/${canal.id}`} 
                        key={canal.id} 
                        className='nombre-canal-sb'
                        onClick={handleCanalClick}
                        >
                            <li className={`canal-item ${canal.id === canalSeleccionado ? 'active' : ''}`}>
                                <i className="bi bi-hash"></i>
                                <span>{canal.nombreCanal}</span>
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
                                        value={nombreNuevoCanal}
                                        onChange={handleCambioInput}
                                        placeholder='Nombre del nuevo canal'
                                        className='nuevo-canal-input'
                                    />
                                    {error && <p className='error-nuevo-canal'>{error}</p>}
                                    <div className='botones-formulario'>
                                        <button className='confirmar-btn' type='submit'>Confirmar</button>
                                        <button className='cancelar-btn' type='button' onClick={handleCancelar}>Cancelar</button>
                                    </div>
                                </form>
                            </li>
                        )}
                </ul>
            </div>
        </div>

    )
}

export default SideBar
