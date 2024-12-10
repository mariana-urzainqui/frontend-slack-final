import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    
    const navigate = useNavigate()

    const handleCancel = () => {
        navigate('/home')
    }

    const handleCreateWorkspace = () => {
        navigate('/workspace/new')
    }

    return (
        <GlobalContext.Provider value={{
            handleCancel,
            handleCreateWorkspace,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
