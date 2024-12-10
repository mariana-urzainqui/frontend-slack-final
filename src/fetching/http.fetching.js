export const POST = async (URL_API, { body, headers }) => {
    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            console.error('Error en la solicitud POST:', errorResponse)
            return errorResponse
        }

        return await response.json()
    } 
    catch (error) {
        console.error('Error en la solicitud POST:', error)
        throw error 
    }
}

export const PUT = async (URL_API, { body, headers }) => {
    try {
        const response = await fetch(URL_API, {
            method: 'PUT', 
            headers: headers,
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            console.error('Error en la solicitud PUT:', errorResponse)
            return errorResponse
        }

        return await response.json()
    } 
    catch (error) {
        console.error('Error en la solicitud PUT:', error)
        throw error
    }
}

export const GET = async (URL_API, headers) => {
    try {
        const response = await fetch(URL_API, {
            method: 'GET',
            headers: headers,
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            console.error('Error en la solicitud GET:', errorResponse)
            return errorResponse
        }

        return await response.json()
    } 
    catch (error) {
        console.error('Error en la solicitud GET:', error)
        throw error
    }
}

export const DELETE = async (URL_API, headers) => {
    try {
        const response = await fetch(URL_API, {
            method: 'DELETE',
            headers: headers,
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            console.error('Error en la solicitud DELETE:', errorResponse)
            return errorResponse
        }

        return await response.json()
    } 
    catch (error) {
        console.error('Error en la solicitud DELETE:', error)
        throw error
    }
}


const getUnauthenticatedHeaders = () => {
    const unauthenticatedHeaders = new Headers()
    unauthenticatedHeaders.set('Content-Type', 'application/json')
    unauthenticatedHeaders.set('x-api-key', import.meta.env.VITE_API_KEY)
    return unauthenticatedHeaders
}

    const getAuthenticatedHeaders = () => {
        const authenticatedHeaders = new Headers()
        authenticatedHeaders.set('Content-Type', 'application/json')
        authenticatedHeaders.set('x-api-key', import.meta.env.VITE_API_KEY)
        authenticatedHeaders.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
        return authenticatedHeaders
    }



export { getAuthenticatedHeaders, getUnauthenticatedHeaders }