import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GET, getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'

const VerifyEmail = () => {
    const { verification_token } = useParams()
    const navigate = useNavigate()

    const [statusMessage, setStatusMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                setStatusMessage('Verificando...')
                const response = await GET(`${import.meta.env.VITE_URL_BACK}/api/auth/verify/${verification_token}`, {
                    body: {},
                    headers: getUnauthenticatedHeaders(),
                })
                console.log('Response status:', response.status)
                if (response.ok) {
                    setStatusMessage('¡Correo verificado con éxito!')
                    setTimeout(() => {
                        navigate('/login')
                    }, 10000)
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
        if (verification_token) {
            verifyEmail()
        }
    }, [verification_token, navigate])
    return (
        <div>
            <h1>Verificación de Correo</h1>
            {isLoading
                ? (<p>Cargando...</p>)
                : (<p>{statusMessage}</p>)
            }
        </div>
    )
}

export default VerifyEmail
