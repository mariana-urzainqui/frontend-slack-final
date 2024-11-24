import React, { useContext } from 'react'
import { GlobalContext } from '../../Context/GlobalContext'
import './Home.css'
import { HomeHeader, WorkspacesContainer } from '../../Components'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const { entornos } = useContext(GlobalContext)
    const navigate = useNavigate()

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
                    <WorkspacesContainer entornos={entornos} onIniciarSlack={handleIniciarSlack} />
                </div>
            </main>

        </div>
    )
}

export default Home
