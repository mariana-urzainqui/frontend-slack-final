import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/http.fetching"

const useChannels = (workspaceId) => {
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await GET(`${import.meta.env.VITE_URL_BACK}/api/channel/${workspaceId}/channels`, getAuthenticatedHeaders())

                if (response.ok) {
                    setChannels(response.payload.channels)
                } else {
                    setError(response.message || 'Error al obtener los canales')
                }
            } catch (error) {
                setError('Error en la solicitud')
                console.error('Error al obtener los canales:', error)
            } finally {
                setLoading(false)
            }
        }

        if (workspaceId) {
            fetchChannels()
        }
    }, [workspaceId])

    return { channels, loading, error }
}

export default useChannels