export const validarInput = (input) => {
    return input && input.trim().length >=8
}

export const obtenerErrorInput = (input, nombreCampo) => {
    if(!validarInput(input)) {
        return `El nombre del ${nombreCampo} debe tener al menos 8 caracteres`
    }
    return null
}

export const validarForm = (nombreEntorno, nombreCanal) => {
    const errors = {}

    const nombreEntornoError = obtenerErrorInput(nombreEntorno, 'espacio')
    if (nombreEntornoError) errors.nombreEntorno = nombreEntornoError

    const nombreCanalError = obtenerErrorInput(nombreCanal, 'canal')
    if (nombreCanalError) errors.nombreCanal = nombreCanalError

    return errors
}