import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { POST, getUnauthenticatedHeaders } from '../../fetching/http.fetching'
import useForm from '../../Hooks/useForm'
import useFormValidation from '../../Hooks/useFormValidation'

const Register = () => {
    const { form_values_state, handleChangeInputValue, clearForm } = useForm({
        name: '',
        email: '',
        password: '',
    })

    const { validateForm } = useFormValidation(form_values_state)
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
                setSuccessMessage('¡Registro exitoso! Verifica tu correo para confirmar tu cuenta.')
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
        <div>
            <h1>Regístrate en nuestra web</h1>
            <form onSubmit={handleSubmitRegisterForm}>
                <div>
                    <label htmlFor="name">Ingrese su nombre:</label>
                    <input
                        name="name"
                        id="name"
                        placeholder="Pepe Suarez"
                        value={form_values_state.name}
                        onChange={handleChangeInputValue}
                    />
                    {formErrorsState.name && <span className="error">{formErrorsState.name}</span>}
                </div>
                <div>
                    <label htmlFor="email">Ingrese su email:</label>
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
                    <div>
                        <label htmlFor="password">Ingrese su contraseña:</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="***********"
                            value={form_values_state.password}
                            onChange={handleChangeInputValue}
                        />
                        {formErrorsState.password && Array.isArray(formErrorsState.password) && (
                            <div className="error">
                                {formErrorsState.password.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <button type="submit" disabled={isSubmitting}>Registrar</button>
            </form>
            {successMessage && <span className="success">{successMessage}</span>}
            <span>
                ¿Ya tienes cuenta?{' '}
                <Link to="/login">Inicia sesión aquí</Link>
            </span>
        </div>
    )
}

export default Register
