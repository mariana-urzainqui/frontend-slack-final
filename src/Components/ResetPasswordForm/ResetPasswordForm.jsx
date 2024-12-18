import React, { useEffect, useState } from "react"
import './ResetPasswordForm.css'
import { Link, useParams } from "react-router-dom"
import useForm from "../../Hooks/useForm"
import useFormValidation from "../../Hooks/useFormValidation"
import { getUnauthenticatedHeaders, PUT } from "../../fetching/http.fetching"
import useFormFocus from "../../Hooks/useFormFocus"

const ResetPasswordForm = () => {
    const { reset_token } = useParams()

    const { form_values_state, handleChangeInputValue } = useForm({
        password: "",
    })

    const { validateForm } = useFormValidation(form_values_state, {
        validatePassword: true,
        validatePasswordComplexity: true,
    })

    const { focusedField, handleFocus, handleBlur, shouldShowError, markSubmitted } = useFormFocus()

    const [formErrorsState, setFormErrorsState] = useState({})
    const [successMessage, setSuccessMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isPasswordReset, setIsPasswordReset] = useState(false)
    const [backendErrors, setBackendErrors] = useState({})

    useEffect(() => {
        const errors = validateForm()
        setFormErrorsState(errors)
    }, [form_values_state])

    const handleSubmitResetPasswordForm = async (event) => {
        event.preventDefault()

        markSubmitted()

        if (isSubmitting || isPasswordReset) return

        setIsSubmitting(true)
        setFormErrorsState({})
        setBackendErrors({})
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
                const backendErrorsObj = {}
                Object.keys(response.payload.errors).forEach(key => {
                    backendErrorsObj[key] = response.payload.errors[key]
                })
                setBackendErrors(backendErrorsObj)
            }
            else {
                setSuccessMessage("Tu contraseña ha sido restablecida correctamente. 😄")
                setIsPasswordReset(true)
            }
        }
        catch (error) {
            console.error("Error al enviar la solicitud de restablecimiento de contraseña", error)
            setBackendErrors({ general: 'Hubo un error al procesar tu solicitud, por favor intenta nuevamente' })
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="reset-password-form" onSubmit={handleSubmitResetPasswordForm}>
            {backendErrors.general && (
                <div className="reset-password-error reset-password-error-general">
                    {backendErrors.general}
                </div>
            )}
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
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    disabled={isSubmitting || isPasswordReset}
                />
                {(shouldShowError('password', formErrorsState, backendErrors)) && (
                    <div className="reset-password-error">
                        {Array.isArray(formErrorsState.password)
                            ? formErrorsState.password.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))
                            : <p>{formErrorsState.password || backendErrors.password}</p>
                        }
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
