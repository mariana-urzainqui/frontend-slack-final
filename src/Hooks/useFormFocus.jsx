import { useState } from 'react'

const useFormFocus = () => {
    const [focusedField, setFocusedField] = useState(null)
    const [wasSubmitted, setWasSubmitted] = useState(false)

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName)
    }

    const handleBlur = () => {
        setFocusedField(null)
    }

    const markSubmitted = () => {
        setWasSubmitted(true)
    }

    const shouldShowError = (fieldName, formErrors = {}, backendErrors = {}) => {
        if (backendErrors[fieldName]) {
            return true
        }

        return (focusedField === fieldName || wasSubmitted) && formErrors[fieldName]
    }

    return {
        focusedField,
        handleFocus,
        handleBlur,
        shouldShowError,
        markSubmitted
    }
}

export default useFormFocus