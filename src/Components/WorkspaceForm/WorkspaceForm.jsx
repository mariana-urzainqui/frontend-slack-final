import React, { useEffect, useState } from 'react'
import './WorkspaceForm.css'
import { useNavigate } from 'react-router-dom'
import useCreateWorkspace from '../../Hooks/useCreateWorkspace'
import useForm from '../../Hooks/useForm'
import useFormValidation from '../../Hooks/useFormValidation'

const WorkspaceForm = () => {
    const navigate = useNavigate()

    const { form_values_state, handleChangeInputValue } = useForm({
        workspaceName: '',
        channelName: ''
    })

    const { formErrors, validateForm } = useFormValidation(form_values_state, {
        validateWorkspaceName: true,
        validateChannelName: true
    })
    const [formErrorsState, setFormErrorsState] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { createWorkspace, loading, error: backendError } = useCreateWorkspace()

    useEffect(() => {
        const errors = validateForm(form_values_state)
        setFormErrorsState(errors)
    }, [form_values_state])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(isSubmitting) return

        setIsSubmitting(true)

        const errors = validateForm(form_values_state)

        if(Object.keys(errors).length > 0) {
            setFormErrorsState(errors)
            setIsSubmitting(false)
            return
        }
        try{
            const nuevoEntorno = await createWorkspace(form_values_state.workspaceName, form_values_state.channelName)
            if(nuevoEntorno){
                navigate('/home')
            }
        }
        catch(error){
            console.error('Error al crear el workspace:', error)
        }
        finally{
            setIsSubmitting(false)
        }
    }

    return (
        <form className='form-nuevo-entorno' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="workspaceName">Nombre del espacio de trabajo:</label>
                <input
                    type="text"
                    id='workspaceName'
                    name='workspaceName'
                    value={form_values_state.workspaceName}
                    onChange={handleChangeInputValue}
                    placeholder='Introduce el nombre del espacio'
                />
                {formErrorsState.workspaceName && <span className='mensaje-error-ws'>{formErrorsState.workspaceName}</span>}
            </div>
            <div className='form-group'>
                <label htmlFor="channelName">Nombre del canal #:</label>
                <input
                    type="text"
                    id='channelName'
                    name='channelName'
                    value={form_values_state.channelName}
                    onChange={handleChangeInputValue}
                    placeholder='Introduce el nombre del canal'
                />
                {formErrorsState.channelName && <span className='mensaje-error-ws'>{formErrorsState.channelName}</span>}
            </div>
            {backendError && <span className='mensaje-error-ws'>{backendError}</span>}
            <div className='botones-form'>
                <button type='submit' className='btn-crear-entorno' disabled={loading || isSubmitting}>
                    {loading || isSubmitting ? 'Creando...' : 'Crear'}
                </button>
                <button type='button' onClick={() => navigate('/home')} className='btn-cancelar'>Cancelar</button>
            </div>
        </form>
    )
}

export default WorkspaceForm