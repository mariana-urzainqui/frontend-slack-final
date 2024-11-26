import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import useFormValidation from '../../Hooks/useFormValidation'
import { getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'


const Login = () => {
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
        <div>
            <h1>Inicia sesión</h1>
            <form onSubmit={handleSubmitLoginForm}>
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
                    />
                    {formErrorsState.email && <span className="error">{formErrorsState.email}</span>}
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="***********"
                        value={form_values_state.password}
                        onChange={handleChangeInputValue}
                    />
                    {formErrorsState.password && (
                        <div className="error">
                            {Array.isArray(formErrorsState.password)
                                ? (
                                    formErrorsState.password.map((error, index) => (
                                        <p key={index}>{error}</p>
                                    ))
                                )
                                : (
                                    <p>{formErrorsState.password}</p>
                                )}
                        </div>
                    )}
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
            </form>
            <span>
                Si has olvidado tu contraseña, puedes <Link to='/forgot-password'>restablecerla aqui</Link>
            </span>
            <span>
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </span>
        </div>
    )
}

export default Login

