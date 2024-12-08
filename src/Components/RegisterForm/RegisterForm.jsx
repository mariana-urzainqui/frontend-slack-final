import React, { useEffect, useState } from 'react'
import './RegisterForm.css'
import useForm from '../../Hooks/useForm'
import useFormValidation from '../../Hooks/useFormValidation'
import { getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
    const { form_values_state, handleChangeInputValue, clearForm } = useForm({
        name: '',
        email: '',
        password: '',
    })

    const { validateForm } = useFormValidation(form_values_state, {
        validateName: true,
        validateEmail: true,
        validatePassword: true,
        validatePasswordComplexity: true
    })

    const [formErrorsState, setFormErrorsState] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const errors = validateForm()
        setFormErrorsState(errors)
    }, [form_values_state])

    const handleSubmitRegisterForm = async (event) => {
        event.preventDefault()

        if (isSubmitting) return

        setIsSubmitting(true)
        setSuccessMessage('')
        setFormErrorsState({})

        const errors = validateForm()
        if (Object.keys(errors).length > 0) {
            setFormErrorsState(errors)
            setIsSubmitting(false)
            return
        }

        try {
            const response = await POST(`${import.meta.env.VITE_URL_BACK}/api/auth/register`, {
                body: form_values_state,
                headers: getUnauthenticatedHeaders(),
            })

            if (response.payload?.errors) {
                setFormErrorsState(response.payload.errors)
            } else {
                setSuccessMessage('🎉 ¡Registro exitoso! Verifica tu correo para confirmar tu cuenta. 😊')
            }
        }
        catch (error) {
            console.error('Error al registrar:', error)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className='register-form' onSubmit={handleSubmitRegisterForm}>
            {successMessage && <span className="register-success">{successMessage}</span>}
            <div className='register-form-group'>
                <label htmlFor="name" className='register-label'>Ingrese su nombre:</label>
                <input
                    name="name"
                    id="name"
                    type='text'
                    className='register-input'
                    placeholder="Pepe Suarez"
                    value={form_values_state.name}
                    onChange={handleChangeInputValue}
                />
                {formErrorsState.name && <span className="register-error">{formErrorsState.name}</span>}
            </div>
            <div className='register-form-group'>
                <label htmlFor="email" className='register-label'>Ingrese su email:</label>
                <input
                    name="email"
                    id="email"
                    type="email"
                    className='register-input'
                    placeholder="pepe@gmail.com"
                    value={form_values_state.email}
                    onChange={handleChangeInputValue}
                />
                {formErrorsState.email && <span className="register-error">{formErrorsState.email}</span>}
                <div className='register-form-group'>
                    <label htmlFor="password" className='register-label'>Ingrese su contraseña:</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        className='register-input'
                        placeholder="***********"
                        value={form_values_state.password}
                        onChange={handleChangeInputValue}
                    />
                    {formErrorsState.password && Array.isArray(formErrorsState.password) && (
                        <div className="register-error">
                            {formErrorsState.password.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button type="submit" className='register-button' disabled={isSubmitting}>Registrar</button>
            <div className='register-footer'>
                <span className='register-footer-text'>
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className='register-link'>Inicia sesión aquí</Link>
                </span>
            </div>
        </form>
    )
}


export default RegisterForm
