import { z } from 'zod';

export const tipoVehiculoSchema = z.object({
    nombre: z.string({
        required_error: 'El "Nombre" es requerido.',
        invalid_type_error: 'El "Nombre" debe de ser un texto.',
    }).max(10, {
        message: 'El nombre del tipo de vehiculo no puede pasar los 10 caracteres.'
    }).min(3, {
        message: 'El nombre del tipo de vehiculo no puede ser menor de 3 caracteres.'
    }),
    cupo: z.number({
        required_error: 'El "Cupo" es requerido.',
        invalid_type_error: 'El "Cupo" debe de ser un número.',
    }).min(1, {
        message: 'El cupo debe ser mayor a 1.'
    })
})

