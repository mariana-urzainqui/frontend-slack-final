import React from "react"   
import './ResetPassword.css'
import ResetPasswordForm from "../../Components/ResetPasswordForm/ResetPasswordForm"

const ResetPassword = () => {
    return (
        <div className='reset-password-container'>
            <div className='logo-container'>
                <img src="/assets/images/slack-logo.png" alt="Logo" />
            </div>
            <div className='form-container'>
                <h1 className='reset-password-title'>Restablecer contraseña</h1>
                <ResetPasswordForm />
            </div>
        </div>
    )
}

export default ResetPassword
