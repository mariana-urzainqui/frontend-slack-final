import React from "react"
import { useNavigate } from "react-router-dom"
import useWorkspaces from "../../Hooks/useWorkspaces"
import { HomeHeader, WorkspacesContainer } from '../../Components'
import './Home.css'

const Home = () => {
    const navigate = useNavigate()
    const { workspaces, loading, error } = useWorkspaces()

    const handleIniciarSlack = (id_workspace, id_canal) => {
        navigate(`/workspace/${id_workspace}/${id_canal}`)
    }

    return (
        <div className='app-container'>
            <HomeHeader />
            <main className='contenedor-main'>
                <div className='content-wrapper'>
                    <div className='div-saludo'>
                        <img src="./assets/images/waving-hand.png" alt="Mano saludando" />
                        <h1>¡Hola de nuevo!</h1>
                    </div>
                    {loading && <p className="mensaje-cargando">Cargando tus workspaces...</p>}
                    {!loading  && (
                        <WorkspacesContainer entornos={workspaces} onIniciarSlack={handleIniciarSlack} error={error} />                      
                    )}                    
                </div>
            </main>
        </div>
    )
}

export default Home
