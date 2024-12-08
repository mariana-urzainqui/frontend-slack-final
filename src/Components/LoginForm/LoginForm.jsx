import React, { useEffect, useState } from 'react'
import './LoginForm.css'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import useFormValidation from '../../Hooks/useFormValidation'
import { getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'

const LoginForm = () => {
    const navigate = useNavigate()

    const { form_values_state, handleChangeInputValue } = useForm({
        email: '',
        password: '',
    })

    const { validateForm } = useFormValidation(form_values_state, {
        validateEmail: true,
        validatePassword: true,
    })

    const [formErrorsState, setFormErrorsState] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const errors = validateForm(form_values_state)
        setFormErrorsState(errors)
    }, [form_values_state])

    const handleSubmitLoginForm = async (event) => {
        event.preventDefault()

        if (isSubmitting) return

        setIsSubmitting(true)
        setFormErrorsState({})

        const errors = validateForm()

        if (Object.keys(errors).length > 0) {
            setFormErrorsState(errors)
            setIsSubmitting(false)
            return
        }

        try {
            const response = await POST(`${import.meta.env.VITE_URL_BACK}/api/auth/login`, {
                body: form_values_state,
                headers: getUnauthenticatedHeaders(),
            })

            if (response.payload?.errors) {
                setFormErrorsState(response.payload.errors)

                if (response.payload.errors.general) {
                    setFormErrorsState(prevState => ({
                        ...prevState,
                        general: response.payload.errors.general,
                    }))
                }

                if (response.payload.errors.email) {
                    setFormErrorsState(prevState => ({
                        ...prevState,
                        email: response.payload.errors.email,
                    }))
                }
            } 
            else {
                const access_token = response.payload.token
                sessionStorage.setItem('access_token', access_token)
                sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))
                navigate('/home')
            }
        } 
        catch (error) {
            console.error('Error al iniciar sesión:', error)
        } 
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className='login-form' onSubmit={handleSubmitLoginForm}>
            <div className='login-form-group'>
                <label htmlFor="email" className='login-label'>Correo electrónico:</label>
                <input
                    name="email"
                    id="email"
                    type="email"
                    className='login-input'
                    placeholder="pepe@gmail.com"
                    value={form_values_state.email}
                    onChange={handleChangeInputValue}
                />
                {formErrorsState.email && <span className="login-error">{formErrorsState.email}</span>}
            </div>

            <div className='login-form-group'>
                <label htmlFor="password" className='login-label'>Contraseña:</label>
                <input
                    name="password"
                    id="password"
                    type="password"
                    className='login-input'
                    placeholder="***********"
                    value={form_values_state.password}
                    onChange={handleChangeInputValue}
                />

                {formErrorsState.password && (
                    <div className="login-error">
                        {Array.isArray(formErrorsState.password)
                            ? formErrorsState.password.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))
                            : <p>{formErrorsState.password}</p>
                        }
                    </div>
                )}
            </div>

            {formErrorsState.general && <div className="login-error login-error-general">{formErrorsState.general}</div>}

            <button type="submit" className='login-button' disabled={isSubmitting}>
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            <div className='login-form-footer'>
                <span className='login-footer-text'>
                    Si has olvidado tu contraseña, puedes <Link to='/forgot-password' className='login-link'>restablecerla aquí</Link>
                </span>

                <span className='login-footer-text'>
                    ¿No tienes cuenta? <Link to="/register" className='login-link'>Regístrate aquí</Link>
                </span>
            </div>
        </form>
    )
}

export default LoginForm
