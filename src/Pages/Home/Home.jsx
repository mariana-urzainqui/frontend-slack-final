import './Home.css'
import { HomeHeader, WorkspacesContainer } from '../../Components'
import { useNavigate } from 'react-router-dom'
import useWorkspaces from '../../Hooks/useWorkspaces'


const Home = () => {
    const {workspaces, loading, error } = useWorkspaces
    const navigate = useNavigate()

    const handleIniciarSlack = (id_workspace, id_canal) => {
        navigate(`/workspace/${id_workspace}/${id_canal}`)
    }

    if (loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Error: {error}</div>
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
                    <WorkspacesContainer workspaces={workspaces} onIniciarSlack={handleIniciarSlack} />
                </div>
            </main>

        </div>
    )
}

export default Home
