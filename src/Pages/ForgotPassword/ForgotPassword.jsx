import React, { useState } from 'react'
import useForm from '../../Hooks/useForm'
import useFormValidation from '../../Hooks/useFormValidation'
import { getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const { form_values_state, handleChangeInputValue } = useForm({
        email: '',
    })

    const { validateForm } = useFormValidation(form_values_state, {
        validateEmail: true, 
    })

    const [formErrorsState, setFormErrorsState] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmitForgotPasswordForm = async (event) => {
        event.preventDefault()

        if (isSubmitting) return

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
            } 
            else {
                setSuccessMessage('Te hemos enviado un correo con las instrucciones para restablecer tu contraseña.')
            }
        } 
        catch (error) {
            console.error('Error al enviar la solicitud de restablecimiento de contraseña:', error)
        } 
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <h1>¿Olvidaste tu contraseña?</h1>
            <p>Introduce tu correo electrónico para enviarte las instrucciones de restablecimiento de contraseña.</p>
            <form onSubmit={handleSubmitForgotPasswordForm}>
                {formErrorsState.general && <div className="error">{formErrorsState.general}</div>}
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="pepe@gmail.com"
                        value={form_values_state.email}
                        onChange={handleChangeInputValue}
                        disabled={isSubmitting}
                    />
                    {formErrorsState.email && <span className="error">{formErrorsState.email}</span>}
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando instrucciones...' : 'Enviar instrucciones'}
                </button>
            </form>
            {successMessage && <span className="success">{successMessage}</span>}
            <span>
                Si tienes cuenta, puedes <Link to='/login'>iniciar sesión aquí</Link>
            </span>
            <span>
                Si aún no tienes cuenta, puedes <Link to='/register'>registrarte aquí</Link>
            </span>
        </div>
    )
}

export default ForgotPassword