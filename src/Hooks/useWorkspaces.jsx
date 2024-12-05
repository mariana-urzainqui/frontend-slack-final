import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/http.fetching"

const useWorkspaces = () => {
    const [workspaces, setWorkspaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await GET(`${import.meta.env.VITE_URL_BACK}/api/workspace`, getAuthenticatedHeaders())

                if (response.ok) {
                    setWorkspaces(response.payload.workspaces)
                } 
                else {
                    setError(response.message || 'Error al obtener los workspaces')
                }
            } 
            catch (error) {
                setError('Error en la solicitud')
                console.error('Error al obtener los workspaces:', error)
            } 
            finally {
                setLoading(false)
            }
        }

        fetchWorkspaces()
    }, []) 

    return { workspaces, loading, error }
}

export default useWorkspaces
