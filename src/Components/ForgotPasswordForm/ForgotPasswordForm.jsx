import React, { useState, useEffect } from 'react'
import './ForgotPasswordForm.css'
import useForm from '../../Hooks/useForm'
import useFormValidation from '../../Hooks/useFormValidation'
import { getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPasswordForm = () => {
    const { form_values_state, handleChangeInputValue } = useForm({
        email: '',
    })

    const { validateForm } = useFormValidation(form_values_state, {
        validateEmail: true,
    })

    const [formErrorsState, setFormErrorsState] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [emailSent, setEmailSent] = useState(false) 
    const navigate = useNavigate()

    useEffect(() => {
        const errors = validateForm(form_values_state)
        setFormErrorsState(errors)
    }, [form_values_state])

    const handleSubmitForgotPasswordForm = async (event) => {
        event.preventDefault()

        if (isSubmitting || emailSent) return 

        setIsSubmitting(true)
        setFormErrorsState({})
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
                setFormErrorsState(response.payload.errors)
            } else {
                setSuccessMessage('Te hemos enviado un correo con las instrucciones para restablecer tu contraseña.')
                setEmailSent(true) 
                setTimeout(() => {
                    setEmailSent(false) 
                }, 20000) 
            }
        }
        catch (error) {
            console.error('Error al enviar la solicitud de restablecimiento de contraseña:', error)
            setFormErrorsState({ general: 'Hubo un error al procesar tu solicitud, por favor intenta nuevamente.' })
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

            {formErrorsState.general && (
                <div className="forgot-password-error forgot-password-error-general">
                    {formErrorsState.general}
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
                    disabled={isSubmitting}
                />
                {formErrorsState.email && (
                    <span className="forgot-password-error">{formErrorsState.email}</span>
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
