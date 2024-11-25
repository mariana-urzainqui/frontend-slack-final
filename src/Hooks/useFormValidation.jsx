import { useState } from "react"

const useFormValidation = (form_values_state) => {
    const [formErrors, setFormErrors] = useState({})

    const validateForm = () => {
        const errors = {}

        if (!form_values_state.name) {
            errors.name = 'El nombre es obligatorio'
        } else if (form_values_state.name.length < 3) {
            errors.name = 'El nombre debe tener al menos 3 caracteres'
        }

        if (!form_values_state.email) {
            errors.email = 'El correo electrónico es obligatorio'
        } else if (!/\S+@\S+\.\S+/.test(form_values_state.email)) {
            errors.email = 'Formato de correo inválido'
        }

        const passwordErrors = []

        if (!form_values_state.password) {
            passwordErrors.push('La contraseña es obligatoria')
        } 
        else {
            if (form_values_state.password.length < 8) {
                passwordErrors.push('La contraseña debe tener al menos 8 caracteres')
            }
            if (!/[0-9]/.test(form_values_state.password)) {
                passwordErrors.push('La contraseña debe contener al menos un número')
            }
            if (!/[A-Z]/.test(form_values_state.password)) {
                passwordErrors.push('La contraseña debe contener al menos una letra mayúscula')
            }
            if (!/[@$!%*?&_.-]/.test(form_values_state.password)) {
                passwordErrors.push('La contraseña debe contener al menos un carácter especial')
            }
        }

        if (passwordErrors.length > 0) {
            errors.password = passwordErrors
        }

        setFormErrors(errors)
        return errors
    }

    return {
        formErrors,
        validateForm,
    }
}

export default useFormValidation


