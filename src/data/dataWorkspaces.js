export const USUARIO_LOGUEADO = {
    nombre: 'Juan',
    id: 99,
    foto: '/assets/images/profile-pictures/juan.avif',
    email: 'juan123@gmail.com'
}

export const DATA_ENTORNOS_TRABAJO = [
    {
        nombreEntorno: 'Equipo Desarrollo',
        id: 1, 
        descripcion: 'Equipo encargado del desarrollo de productos',
        fotoEntorno: '/assets/images/workspaces/desarrollo.png',
        miembros: [
            { 
                nombreMiembro: 'Ana', 
                id: 101, 
                fotoPerfil: '/assets/images/profile-pictures/ana.avif' 
            },
            { 
                nombreMiembro: 'Luis', 
                id: 102,
                fotoPerfil: '/assets/images/profile-pictures/luis.avif'  
            },
            { 
                nombreMiembro: 'Marta', 
                id: 103,
                fotoPerfil: '/assets/images/profile-pictures/marta.avif' 
            },
            { 
                nombreMiembro: 'Carlos', 
                id: 104,
                fotoPerfil: '/assets/images/profile-pictures/carlos.avif'  
            },
            { 
                nombreMiembro: 'Laura', 
                id: 105,
                fotoPerfil: '/assets/images/profile-pictures/laura.avif' 
            },
            { 
                nombreMiembro: USUARIO_LOGUEADO.nombre, 
                id: USUARIO_LOGUEADO.id,
                fotoPerfil: USUARIO_LOGUEADO.foto
            }
        ],
        canales: [
            { 
                nombreCanal: 'General',
                id: 201,
                descripcion: 'Canal general para discusiones del equipo',
                mensajes: [
                    { 
                        autor: 'Ana', 
                        contenido: '¿Alguna actualización sobre el proyecto?', 
                        fecha: '31/07/2024', 
                        hora: '09:00', 
                        id: 301 
                    },
                    { 
                        autor: 'Luis', 
                        contenido: 'Estamos trabajando en los últimos detalles.', 
                        fecha: '31/07/2024', 
                        hora: '09:15', 
                        id: 302 
                    },
                    { 
                        autor: 'Juan', 
                        contenido: 'Hola a todos, ¿cómo va el proyecto?', 
                        fecha: '31/07/2024', 
                        hora: '09:30', 
                        id: 303 
                    },
                    { 
                        autor: 'Ana', 
                        contenido: 'Todo bien, gracias.', 
                        fecha: '31/07/2024', 
                        hora: '09:45', 
                        id: 304 
                    }
                ]
            },
            {
                nombreCanal: 'Bug Reports',
                id: 202,
                descripcion: 'Canal para reportar y discutir bugs',
                mensajes: [
                    { 
                        autor: 'Luis', 
                        contenido: 'Encontré un bug en el módulo de login.', 
                        fecha: '30/07/2024', 
                        hora: '16:00', 
                        id: 401 
                    },
                    { 
                        autor: 'Juan', 
                        contenido: '¿Puedes proporcionar más detalles?', 
                        fecha: '30/07/2024', 
                        hora: '16:10', 
                        id: 402 
                    },
                    { 
                        autor: 'Ana', 
                        contenido: 'El bug fue solucionado en el último commit.', 
                        fecha: '30/07/2024',
                        hora: '16:30', 
                        id: 403 
                    }
                ]
            },
            {
                nombreCanal: 'Feedback',
                id: 203,
                descripcion: 'Canal para dar y recibir feedback',
                mensajes: [
                    { 
                        autor: 'Carlos', 
                        contenido: '¿Qué piensan sobre el nuevo diseño?', 
                        fecha: '29/07/2024', 
                        hora: '15:00', 
                        id: 501 
                    },
                    { 
                        autor: 'Juan', 
                        contenido: 'Me gusta, pero creo que hay margen para mejorar.', 
                        fecha: '29/07/2024', 
                        hora: '15:15', 
                        id: 502 
                    },
                    { 
                        autor: 'Laura', 
                        contenido: 'Estoy de acuerdo con Juan, se pueden hacer algunos ajustes.', 
                        fecha: '29/07/2024', 
                        hora: '15:30', 
                        id: 503 
                    }
                ]
            }
        ]
    },
    {
        nombreEntorno: 'Equipo Marketing',
        id: 2,
        descripcion: 'Equipo encargado del marketing y promoción',
        fotoEntorno: '/assets/images/workspaces/marketing.png',
        miembros: [
            { 
                nombreMiembro: 'Sofía', 
                id: 106,
                fotoPerfil: '/assets/images/profile-pictures/sofia.avif' 
            },
            { 
                nombreMiembro: 'Pedro', 
                id: 107,
                fotoPerfil: '/assets/images/profile-pictures/pedro.avif' 
            },
            { 
                nombreMiembro: 'Valeria', 
                id: 108,
                fotoPerfil: '/assets/images/profile-pictures/valeria.avif' 
            },
            { 
                nombreMiembro: 'Jorge', 
                id: 109,
                fotoPerfil: '/assets/images/profile-pictures/jorge.avif' 
            },
            { 
                nombreMiembro: 'Natalia', 
                id: 110,
                fotoPerfil: '/assets/images/profile-pictures/natalia.avif' 
            },
            { 
                nombreMiembro: USUARIO_LOGUEADO.nombre, 
                id: USUARIO_LOGUEADO.id,
                fotoPerfil: USUARIO_LOGUEADO.foto
            }
        ],
        canales: [
            {
                nombreCanal: 'Campañas',
                id: 204, 
                descripcion: 'Canal para discutir campañas de marketing',
                mensajes: [
                    { 
                        autor: 'Pedro', 
                        contenido: '¿Cuándo lanzamos la próxima campaña?', 
                        fecha: '31/07/2024', 
                        hora: '10:00', 
                        id: 601 
                    },
                    { 
                        autor: 'Valeria', 
                        contenido: 'Estamos planeando lanzarla la próxima semana.', 
                        fecha: '31/07/2024', 
                        hora: '10:15', 
                        id: 602 
                    },
                    { 
                        autor: 'Juan', 
                        contenido: '¿Hay algún material preparado para la campaña?', 
                        fecha: '31/07/2024', 
                        hora: '10:30', 
                        id: 603 
                    }
                ]
            },
            {
                nombreCanal: 'Eventos',
                id: 205, 
                descripcion: 'Canal para coordinar eventos y promociones',
                mensajes: [
                    { 
                        autor: 'Jorge', 
                        contenido: 'El evento de lanzamiento será el próximo mes.', 
                        fecha: '30/07/2024', 
                        hora: '14:00', 
                        id: 701 
                    },
                    { 
                        autor: 'Natalia', 
                        contenido: 'Estamos esperando la confirmación del lugar.', 
                        fecha: '30/07/2024', 
                        hora: '14:15', 
                        id: 702 
                    },
                    { 
                        autor: 'Valeria', 
                        contenido: '¿Necesitan ayuda con la promoción del evento?', 
                        fecha: '30/07/2024', 
                        hora: '14:30', 
                        id: 703 
                    }
                ]
            },
            {
                nombreCanal: 'Estrategias',
                id: 206, 
                descripcion: 'Canal para discutir estrategias de marketing',
                mensajes: [
                    { 
                        autor: 'Sofía', 
                        contenido: '¿Qué estrategias estamos implementando este trimestre?', 
                        fecha: '29/07/2024', 
                        hora: '15:00', 
                        id: 801 
                    },
                    { 
                        autor: 'Pedro', 
                        contenido: 'Estamos enfocándonos en marketing digital y SEO.', 
                        fecha: '29/07/2024', 
                        hora: '15:15', 
                        id: 802 
                    },
                    { 
                        autor: 'Juan', 
                        contenido: '¿Cómo está el rendimiento de las campañas actuales?', 
                        fecha: '29/07/2024', 
                        hora: '15:30', 
                        id: 803 
                    }
                ]
            }
        ]
    },
    {
        nombreEntorno: 'Equipo Ventas',
        id: 3, 
        descripcion: 'Equipo encargado de ventas y relaciones con clientes',
        fotoEntorno: '/assets/images/workspaces/ventas.png',
        miembros: [
            { 
                nombreMiembro: 'Raúl', 
                id: 111,
                fotoPerfil: '/assets/images/profile-pictures/raul.avif' 
            },
            { 
                nombreMiembro: 'Jazmín', 
                id: 112,
                fotoPerfil: '/assets/images/profile-pictures/jazmin.avif' 
            },
            { 
                nombreMiembro: 'Tomás', 
                id: 113,
                fotoPerfil: '/assets/images/profile-pictures/tomas.avif' 
            },
            { 
                nombreMiembro: 'Victoria', 
                id: 114,
                fotoPerfil: '/assets/images/profile-pictures/victoria.avif' 
            },
            { 
                nombreMiembro: 'Manuel', 
                id: 115,
                fotoPerfil: '/assets/images/profile-pictures/manuel.avif'
            },
            { 
                nombreMiembro: USUARIO_LOGUEADO.nombre, 
                id: USUARIO_LOGUEADO.id,
                fotoPerfil: USUARIO_LOGUEADO.foto 
            }
        ],
        canales: [
            {
                nombreCanal: 'Clientes',
                id: 207, 
                descripcion: 'Canal para gestionar relaciones con clientes',
                mensajes: [
                    { 
                        autor: 'Raúl', 
                        contenido: 'Tenemos una reunión con un cliente importante mañana.', 
                        fecha: '31/07/2024', 
                        hora: '13:00', 
                        id: 801 
                    },
                    { 
                        autor: 'Juan', 
                        contenido: '¿Qué temas vamos a tratar en la reunión?', 
                        fecha: '31/07/2024', 
                        hora: '13:15', 
                        id: 802 
                    },
                    { 
                        autor: 'Tomás', 
                        contenido: 'Revisen el reporte de ventas antes de la reunión.', 
                        fecha: '31/07/2024', 
                        hora: '13:30', 
                        id: 803 
                    }
                ]
            },
            {
                nombreCanal: 'Ventas',
                id: 208, 
                descripcion: 'Canal para discutir estrategias y resultados de ventas',
                mensajes: [
                    { 
                        autor: 'Tomás', 
                        contenido: 'Las ventas han aumentado este mes.', 
                        fecha: '30/07/2024', 
                        hora: '17:00', 
                        id: 901 
                    },
                    { 
                        autor: 'Victoria', 
                        contenido: 'Sí, y hemos superado nuestras metas.', 
                        fecha: '30/07/2024', 
                        hora: '17:15', 
                        id: 902 
                    },
                    { 
                        autor: 'Juan', 
                        contenido: 'Excelente trabajo, sigan así.', 
                        fecha: '30/07/2024', 
                        hora: '17:30', 
                        id: 903 
                    }
                ]
            },
            {
                nombreCanal: 'Reportes',
                id: 209, 
                descripcion: 'Canal para compartir y discutir reportes de ventas',
                mensajes: [
                    { 
                        autor: 'Manuel', 
                        contenido: 'El reporte mensual está listo para revisión.', 
                        fecha: '29/07/2024', 
                        hora: '11:00', 
                        id: 1001 
                    },
                    { 
                        autor: 'Juan', 
                        contenido: 'Voy a revisarlo ahora.', 
                        fecha: '29/07/2024', 
                        hora: '11:15', 
                        id: 1002 
                    },
                    {
                        
                        autor: 'Victoria', 
                        contenido: 'Asegúrate de incluir todos los datos relevantes.', 
                        fecha: '29/07/2024', 
                        hora: '11:30', 
                        id: 1003 
                    }
                ]
            }
        ]
    }
]
