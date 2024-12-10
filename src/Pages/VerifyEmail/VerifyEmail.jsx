import React, { useEffect, useState } from 'react'
import './VerifyEmail.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GET, getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'

const VerifyEmail = () => {
    const { verification_token } = useParams()
    const navigate = useNavigate()

    const [statusMessage, setStatusMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const verifyEmail = async () => {
        try {
            setStatusMessage('Verificando...')
            const response = await GET(`${import.meta.env.VITE_URL_BACK}/api/auth/verify/${verification_token}`, getUnauthenticatedHeaders())
            console.log('Response status:', response.status)
            if (response.ok) {
                setStatusMessage("¡Correo verificado con éxito! Serás redirigido a inicio de sesión en segundos")
                setTimeout(() => {
                    navigate('/login')
                }, 8000)
            }
            else {
                setStatusMessage(response.payload.detail || 'Error al verificar el correo')
            }
        }
        catch (error) {
            console.error('Error al verificar el correo:', error)
            setStatusMessage('Ocurrió un error al verificar el correo electrónico.')
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (verification_token) {
            verifyEmail()
        }
    }, [verification_token, navigate])
    return (
        <div className="verify-email-container">
            <div className='logo-container'>
                <img src="/assets/images/slack-logo.png" alt="Logo" />
            </div>
            <div className="verify-email-box">
                <img src="/assets/images/email-verified.png" alt="Correo verificado" className="verify-email-image" />
                <h1 className="verify-email-title">Verificación de Correo</h1>
                {isLoading ? (
                    <p className="verify-email-status">Cargando...</p>
                ) : (
                    <p className="verify-email-status">{statusMessage}</p>
                )}
            </div>
            <div className="verify-email-footer">
                <span>Si quieres iniciar sesión,  </span>
                <Link to="/" className="verify-email-home-link">haz clic aquí</Link>.
            </div>
        </div>
    )
}

export default VerifyEmail
