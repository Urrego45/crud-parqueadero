import express from 'express';

import * as parqueaderoController from '../controllers/parqueadero.controller.js';

import { validateSchema } from '../middlewares/validator.js';
import { guardarParqueaderoSchema, editarParqueaderoSchema } from '../schemas/parqueadero.schema.js';

const router = express.Router()

router.get('/parqueadero', parqueaderoController.listParqueadero)
router.post('/parqueadero', validateSchema(guardarParqueaderoSchema), parqueaderoController.createParqueadero)
router.put('/parqueadero/:id', validateSchema(editarParqueaderoSchema), parqueaderoController.updateParqueadero)
router.put('/parqueadero/retiro/:id', parqueaderoController.updateParqueaderoRetiro)
router.delete('/parqueadero/:id', parqueaderoController.deleteParqueadero)


export default router
