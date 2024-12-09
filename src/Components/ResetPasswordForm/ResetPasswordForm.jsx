import React, { useEffect, useState } from "react"
import './ResetPasswordForm.css'
import { Link, useParams } from "react-router-dom"
import useForm from "../../Hooks/useForm"
import useFormValidation from "../../Hooks/useFormValidation"
import { getUnauthenticatedHeaders, PUT } from "../../fetching/http.fetching"

const ResetPasswordForm = () => {
    const { reset_token } = useParams()
    const { form_values_state, handleChangeInputValue } = useForm({
        password: "",
    })

    const { validateForm } = useFormValidation(form_values_state, {
        validatePassword: true,
        validatePasswordComplexity: true,
    })

    const [formErrorsState, setFormErrorsState] = useState({})
    const [successMessage, setSuccessMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isPasswordReset, setIsPasswordReset] = useState(false)

    useEffect(() => {
        const errors = validateForm()
        setFormErrorsState(errors)
    }, [form_values_state])

    const handleSubmitResetPasswordForm = async (event) => {
        event.preventDefault()

        if (isSubmitting || isPasswordReset) return

        setIsSubmitting(true)
        setFormErrorsState({})
        setSuccessMessage("")

        const errors = validateForm()
        if (Object.keys(errors).length > 0) {
            setFormErrorsState(errors)
            setIsSubmitting(false)
            return
        }

        try {
            const response = await PUT(
                `${import.meta.env.VITE_URL_BACK}/api/auth/reset-password/${reset_token}`,
                {
                    body: { password: form_values_state.password },
                    headers: getUnauthenticatedHeaders(),
                }
            )

            if (response.payload?.errors) {
                setFormErrorsState(response.payload.errors);
            } 
            else {
                setSuccessMessage("Tu contraseña ha sido restablecida correctamente. 😄")
                setIsPasswordReset(true)
            }
        } 
        catch (error) {
            console.error("Error al enviar la solicitud de restablecimiento de contraseña", error)
        } 
        finally {
            setIsSubmitting(false)
        }
    }

    return (    
            <form className="reset-password-form" onSubmit={handleSubmitResetPasswordForm}>
                {successMessage && (
                <div className="reset-password-success">
                    <p>{successMessage}</p>
                    <Link className="login-link" to="/login">Haz clic aquí para iniciar sesión</Link>
                </div>
            )}
                <div className="reset-password-form-group">
                    <label className="reset-password-label" htmlFor="password">
                        Nueva contraseña:
                    </label>
                    <input
                        className="reset-password-input"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Ingrese nueva contraseña"
                        value={form_values_state.password}
                        onChange={handleChangeInputValue}
                        disabled={isSubmitting || isPasswordReset} 
                    />
                    {formErrorsState.password && Array.isArray(formErrorsState.password) && (
                        <div className="reset-password-error">
                            {formErrorsState.password.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    className="reset-password-button"
                    type="submit"
                    disabled={isSubmitting || isPasswordReset}
                >
                    {isSubmitting ? "Restableciendo contraseña..." : "Restablecer contraseña"}
                </button>
                <div className="reset-password-footer">
                <span className="reset-password-footer-text">
                    ¿Recuerdas tu contraseña? <a className="reset-password-link" href="/login">Iniciar sesión</a>
                </span>
            </div>
            </form>
            
        
    )
}

export default ResetPasswordForm
