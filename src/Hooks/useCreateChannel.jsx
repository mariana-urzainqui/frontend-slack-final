import { useState } from 'react'
import { POST, getAuthenticatedHeaders } from '../fetching/http.fetching'

const useCreateChannel = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const createChannel = async (workspaceId, channelName) => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await POST(`${import.meta.env.VITE_URL_BACK}/api/channel/${workspaceId}/create`, {
                body: { channelName },
                headers: getAuthenticatedHeaders()
            })

            if (response.ok) {
                setSuccess(response.payload.channel)
            } else {
                setError(response.message || 'Error al crear el canal')
            }
        } catch (error) {
            setError('Error en la solicitud')
            console.error('Error al crear el canal:', error)
        } finally {
            setLoading(false)
        }
    }

    return { createChannel, loading, error, success }
}

export default useCreateChannel
