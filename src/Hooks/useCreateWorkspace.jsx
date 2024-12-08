import { useState } from "react"
import { getAuthenticatedHeaders, POST } from "../fetching/http.fetching"

const useCreateWorkspace = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createWorkspace = async (workspaceName, channelName) => {
        setLoading(true)
        setError(null)

        try{
            const response = await POST(`${import.meta.env.VITE_URL_BACK}/api/workspace/create`, {
                body: { workspaceName, channelName },
                headers: getAuthenticatedHeaders()
            })
            if(response.ok){
                return response.payload.workspace
            }
            else{
                setError(response.message || 'Error al crear el espacio de trabajo')
                return null
            }
        }
        catch(error){
            setError('Error en la solicitud')
            console.error('Error al crear el workspace:', error)
            return null
        }
        finally{
            setLoading(false)
        }
    }

    return { createWorkspace, loading, error }
}

export default useCreateWorkspace