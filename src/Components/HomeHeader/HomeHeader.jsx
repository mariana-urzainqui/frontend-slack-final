import React from 'react'
import './HomeHeader.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    
    const handleLogout = () => {
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('user_info')
        navigate('/login')
    }

    return (
        <header className='home-header'>
            <nav className='header-nav'>
            <div className='logo-container'>
                <img src="./assets/images/slack-logo.png" alt="Logo de slack" />
            </div>
            <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
            </nav>
        </header>
    )
}

export default Header
