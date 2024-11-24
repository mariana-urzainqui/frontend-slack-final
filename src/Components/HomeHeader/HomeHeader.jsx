import React from 'react'
import './HomeHeader.css'
import { useGlobalContext } from '../../Context/GlobalContext'

const Header = () => {
    const { handleCreateWorkspace } = useGlobalContext()

    return (
        <header className='home-header'>
            <nav className='header-nav'>
            <div className='logo-container'>
                <img src="./assets/images/slack-logo.png" alt="Logo de slack" />
            </div>
            <button className='btn-crear-nuevo-header' onClick={handleCreateWorkspace}>CREAR UN NUEVO ESPACIO DE TRABAJO</button>
            </nav>
        </header>
    )
}

export default Header
