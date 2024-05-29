import { z } from 'zod';

export const guardarParqueaderoSchema = z.object({
    vehiculo: z.number({
        required_error: 'El "Tipo de vehiculo" es obligatorio.',
        invalid_type_error: 'El "Tipo de vehiculo" debe de ser un numero.',
    }),
    placa: z.string({
        required_error: 'El "Tipo de vehiculo" es obligatorio.',
        invalid_type_error: 'La "Placa" debe de ser un número.',
    }).max(10, {
        message: 'La placa no puede pasar los 10 caracteres.'
    })
})


export const editarParqueaderoSchema = z.object({
    placa: z.string({
        required_error: 'El "Tipo de vehiculo" es obligatorio.'

    }).max(10, {
        message: 'La placa no puede pasar los 10 caracteres.'
    }),
})

