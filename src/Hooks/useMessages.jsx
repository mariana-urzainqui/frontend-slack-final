import { useState, useEffect } from 'react'
import { GET, getAuthenticatedHeaders } from '../fetching/http.fetching'

const useMessages = (channelId) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true)
            setError(null)

            try {
                const headers = getAuthenticatedHeaders()
                const response = await GET(`${import.meta.env.VITE_URL_BACK}/api/message/${channelId}`, headers)

                if (response.ok) {
                    setMessages(response.payload.messages)
                } 
                else {
                    setError(response.message || 'Error al obtener los mensajes')
                }
            } 
            catch (error) {
                setError('Error en la solicitud')
                console.error('Error al obtener los mensajes:', error)
            } 
            finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [channelId])

    return { messages, loading, error }
}

export default useMessages
