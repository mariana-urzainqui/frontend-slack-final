import React from 'react'
import './ForgotPassword.css'
import ForgotPasswordForm from '../../Components/ForgotPasswordForm/ForgotPasswordForm'

const ForgotPassword = () => {
    return (
        <div className='forgot-password-container'>
            <div className='logo-container-forgot-password'>
            <img src="/assets/images/slack-logo.png" alt="Logo" />
            </div>
            <div className='form-container'>
                <h1 className='forgot-password-title'>Recupera tu cuenta</h1>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}

export default ForgotPassword