import express from 'express';
import morgan from "morgan"

import routesTipoVehiculo from './routes/tipoVehiculo.routes.js';
import routesParqueadero from './routes/parqueadero.routes.js';

const app = express()

app.use(morgan('dev'))
app.use(express.json())


app.use("/api", routesTipoVehiculo)
app.use("/api", routesParqueadero)

export default app