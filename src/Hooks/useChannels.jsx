import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/http.fetching"

const useChannels = (workspaceId) => {
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [key, setKey] = useState(0) 

    const fetchChannels = async () => {
        if (!workspaceId) return;

        try {
            setLoading(true)
            const response = await GET(`${import.meta.env.VITE_URL_BACK}/api/channel/${workspaceId}/channels`, 
                getAuthenticatedHeaders())
            
            if (response.ok) {
                const fetchedChannels = response.payload.channels || []
                setChannels(fetchedChannels)
                setError(null)
            } else {
                setError(response.message || 'Error al obtener los canales')
                setChannels([])
            }
        } catch (error) {
            setError('Error en la solicitud')
            setChannels([])
            console.error('Error al obtener los canales:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchChannels()
    }, [workspaceId, key]) 

    const forceReload = () => {
        setKey(prev => prev + 1)
    }

    return { channels, loading, error, fetchChannels: forceReload }
}

export default useChannels
