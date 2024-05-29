import express from 'express';

import * as tipoVehiculoController from '../controllers/tipoVehiculo.controller.js';

import { validateSchema } from '../middlewares/validator.js';
import { tipoVehiculoSchema } from '../schemas/tipoVehiculo.schema.js';


const router = express.Router()

router.get('/tipo-vehiculo', tipoVehiculoController.listTipoVehiculo)
router.post('/tipo-vehiculo', validateSchema(tipoVehiculoSchema), tipoVehiculoController.createTipoVehiculo)
router.put('/tipo-vehiculo/:id', validateSchema(tipoVehiculoSchema), tipoVehiculoController.updateTipoVehiculo)
router.delete('/tipo-vehiculo/:id', tipoVehiculoController.deleteTipoVehiculo)

export default router


