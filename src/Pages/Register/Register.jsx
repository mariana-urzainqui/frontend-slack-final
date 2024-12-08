import React from 'react'
import './Register.css'
import RegisterForm from '../../Components/RegisterForm/RegisterForm'

const Register = () => {
    return (
        <div className='register-container'>
            <div className='logo-container-register'>
                <img src="/assets/images/slack-logo.png" alt="Logo" />
            </div>
            <div className='form-container'>
                <h1 className='register-title'>Crea tu cuenta</h1>
                <RegisterForm />
            </div>
        </div>
    )

}

export default Register
