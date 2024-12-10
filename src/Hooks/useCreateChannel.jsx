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
            const headers = getAuthenticatedHeaders()
            const requestBody = { channelName }

            const response = await POST(`${import.meta.env.VITE_URL_BACK}/api/channel/${workspaceId}/create`, {
                body: requestBody,
                headers: headers
            })

            if (response.ok) {
                setSuccess(response.payload.channel)
                return response.payload.channel
            } else {
                setError(response.message || 'Error al crear el canal')
                return null
            }
        } catch (error) {
            setError('Error en la solicitud')
            console.error('Error al crear el canal:', error)
            return null
        } finally {
            setLoading(false)
        }
    }

    return { createChannel, loading, error, success }
}

export default useCreateChannel
