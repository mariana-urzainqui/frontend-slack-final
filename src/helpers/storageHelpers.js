import { DATA_ENTORNOS_TRABAJO, USUARIO_LOGUEADO } from "../data/dataWorkspaces"

export const guardarEntornosTrabajo = (entornos) => {
    localStorage.setItem('entornosTrabajo', JSON.stringify(entornos))
    return entornos
}

export const obtenerEntornosTrabajo = () => {
    const entornosGuardados = localStorage.getItem('entornosTrabajo')
    if (entornosGuardados) {
        return JSON.parse(entornosGuardados)
    }
    else {
        return guardarEntornosTrabajo(DATA_ENTORNOS_TRABAJO)
    }
}

const guardarUsuarioLogueado = (usuario) => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario))
    return usuario
}

export const obtenerUsuarioLogueado = () => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado')
    if (usuarioGuardado) {
        return JSON.parse(usuarioGuardado)
    }
    else {
        return guardarUsuarioLogueado(USUARIO_LOGUEADO)
    }
}

export const agregarNuevoMensaje = (idEntorno, idCanal, nuevoMensaje) => {
const entornos = obtenerEntornosTrabajo()
const entorno = entornos.find(entorno => entorno.id === idEntorno)
if (entorno) {
    const canal = entorno.canales.find(canal => canal.id === idCanal)
    if (canal) {
        canal.mensajes.push(nuevoMensaje)
        return guardarEntornosTrabajo(entornos)
    }
}
return entornos
}

export const obtenerEntornoPorId = (idEntorno) => {
    const entornos = obtenerEntornosTrabajo()
    return entornos.find(entorno => entorno.id === idEntorno) || null
}


export const obtenerCanalPorId = (idEntorno, idCanal) => {
    const entorno = obtenerEntornoPorId(idEntorno)
    if (entorno) {
        return entorno.canales.find(canal => canal.id === idCanal) || null
    }
    return null
}

export const agregarNuevoCanal = (idEntorno, nuevoCanal) => {
    const entornos = obtenerEntornosTrabajo()
    const entorno = entornos.find (entorno => entorno.id === idEntorno)
    if (entorno) {
        entorno.canales.push(nuevoCanal)
        return guardarEntornosTrabajo(entornos)
    }
    return entornos
}