import React, { useState, useEffect } from 'react'
import './ForgotPasswordForm.css'
import useForm from '../../Hooks/useForm'
import useFormValidation from '../../Hooks/useFormValidation'
import { getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import { Link } from 'react-router-dom'
import useFormFocus from '../../Hooks/useFormFocus'

const ForgotPasswordForm = () => {
    const { form_values_state, handleChangeInputValue } = useForm({
        email: '',
    })

    const { validateForm } = useFormValidation(form_values_state, {
        validateEmail: true,
    })

    const { focusedField, handleFocus, handleBlur, shouldShowError, markSubmitted } = useFormFocus()

    const [formErrorsState, setFormErrorsState] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [emailSent, setEmailSent] = useState(false) 
    const [backendErrors, setBackendErrors] = useState({})


    useEffect(() => {
        const errors = validateForm(form_values_state)
        setFormErrorsState(errors)
    }, [form_values_state])


    const handleSubmitForgotPasswordForm = async (event) => {
        event.preventDefault()

        if (isSubmitting || emailSent) return 

        markSubmitted()

        setIsSubmitting(true)
        setFormErrorsState({})
        setBackendErrors({})
        setSuccessMessage('') 

        const errors = validateForm()
        if (Object.keys(errors).length > 0) {
            setFormErrorsState(errors)
            setIsSubmitting(false)
            return
        }

        try {
            const response = await POST(`${import.meta.env.VITE_URL_BACK}/api/auth/forgot-password`, {
                body: form_values_state,
                headers: getUnauthenticatedHeaders(),
            })

            if (response.payload?.errors) {
                const backendErrorsObj = {}
                Object.keys(response.payload.errors).forEach(key => {
                    if(key === 'email'){
                        backendErrorsObj.email = response.payload.errors[key]
                    }
                    else{
                        backendErrorsObj.general = response.payload.errors[key]
                    }
                })
                setBackendErrors(backendErrorsObj)
            } 
            else {
                setSuccessMessage('Te hemos enviado un correo con las instrucciones para restablecer tu contraseña.')
                setEmailSent(true) 
                setTimeout(() => {
                    setEmailSent(false) 
                }, 20000) 
            }
        }
        catch (error) {
            console.error('Error al enviar la solicitud de restablecimiento de contraseña:', error)
            setBackendErrors({ general: 'Hubo un error al procesar tu solicitud, por favor intenta nuevamente.' })
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmitForgotPasswordForm}
            className="forgot-password-form"
        >
            {successMessage && (
                <span className="forgot-password-success">
                    {successMessage}
                </span>
            )}

            {backendErrors.general && (
                <div className="forgot-password-error forgot-password-error-general">
                    {backendErrors.general}
                </div>
            )}

            <div className="forgot-password-form-group">
                <label htmlFor="email" className="forgot-password-label">Correo Electrónico:</label>
                <input
                    name="email"
                    id="email"
                    type="email"
                    className="forgot-password-input"
                    placeholder="pepe@gmail.com"
                    value={form_values_state.email}
                    onChange={handleChangeInputValue}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                />
                {(shouldShowError('email', formErrorsState, backendErrors)) && (
                    <span className="forgot-password-error">{formErrorsState.email || backendErrors.email}</span>
                )}
            </div>

            <button type="submit" className="forgot-password-button" disabled={isSubmitting || emailSent}>
                {isSubmitting ? "Enviando instrucciones..." : "Enviar instrucciones"}
            </button>

            <div className="forgot-password-form-footer">
                <span className="forgot-password-footer-text">
                    ¿Ya tienes cuenta? <Link to="/login" className="forgot-password-link">Inicia sesión aquí</Link>
                </span>
                <span className="forgot-password-footer-text">
                    ¿Aún no tienes cuenta? <Link to="/register" className="forgot-password-link">Regístrate aquí</Link>
                </span>
            </div>
        </form>
    )
}

export default ForgotPasswordForm