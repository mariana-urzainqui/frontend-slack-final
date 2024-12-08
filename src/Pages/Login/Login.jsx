import React from 'react'
import './Login.css'
import LoginForm from '../../Components/LoginForm/LoginForm'


const Login = () => {
    return (
        <div className='login-container'>
            <div className='logo-container-login'>
                <img src="/assets/images/slack-logo.png" alt="Logo" />
            </div>
                <div className='form-container'>
                    <h1 className='login-title'>Inicia sesión en tu cuenta</h1>
                    <LoginForm />
                </div>
        </div>
    )
}

export default Login

