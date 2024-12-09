import { useState } from 'react'
import { POST, getAuthenticatedHeaders } from '../fetching/http.fetching'

const useCreateMessage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const createMessage = async (channelId, content) => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await POST(`${import.meta.env.VITE_URL_BACK}/api/message/${channelId}/create`, {
                body: {content},
                headers: getAuthenticatedHeaders()
            })

            if (response.ok) {
                setSuccess(response.payload.message)
            } else {
                setError(response.message || 'Error al crear el mensaje')
            }
        } catch (error) {
            setError('Error en la solicitud')
            console.error('Error al crear el mensaje:', error)
        } finally {
            setLoading(false)
        }
    }

    return { createMessage, loading, error, success }
}

export default useCreateMessage
