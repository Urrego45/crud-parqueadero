import { pool } from '../db.js';

export const listParqueadero = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM parqueadero")
    res.json(result)
      
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createParqueadero = async (req, res) => {
  const { vehiculo, placa } = req.body

  try {
    const [query] = await pool.query(
      "select * from parqueadero where placa = ? and hora_salida is null",
      [placa]
    )

    if (query.length > 0) return res.status(400).json({ message: 'El vehiculo con esta placa se encuentra activo.' })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  try {
    const [[query]] = await pool.query(
      `select if(
        (SELECT COUNT(id) as horas FROM parqueadero where hora_salida is null and vehiculo = ${vehiculo}) < 
        (select cupo from tipo_vehiculo where id = ${vehiculo}), null, 0) as validacion`,
    )

    console.log(query);

    if (query.validacion === 0) return res.status(400).json({ message: 'No hay cupos disponibles en este momento.' })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  try {

    const query = await pool.query(
      "INSERT INTO parqueadero (vehiculo, placa, hora_entrada) VALUES (?, ?, ?)",
      [vehiculo, placa, new Date()]
    )

    res.json({
      id: query.insertId,
      vehiculo: vehiculo,
      placa: placa,
      hora_entrada: new Date()
    })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateParqueadero = async (req, res) => {
  const { placa } = req.body

  try {
    await pool.query(
      "UPDATE parqueadero set placa = ? WHERE id = ?",
      [placa, req.params.id]
    )

    res.json({ message: "Parqueadero actualizado." })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateParqueaderoRetiro = async (req, res) => {

  try {
    const [query] = await pool.query(
      "select * from parqueadero where id = ? and hora_salida is null",
      [req.params.id]
    )

    if (query.length === 0) return res.status(200).json({ message: 'Este vehiculo ya fue retirado.' })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  try {
    await pool.query(
      "UPDATE parqueadero set hora_salida = ? WHERE id = ?",
      [new Date(), req.params.id]
    )

    res.json({ message: "Parqueadero retirado." })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteParqueadero = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM parqueadero WHERE id = ?",
      [req.params.id]
    )

    res.json({ message: "Parqueadero eliminado." })

  } catch (error) {
      return res.status(500).json({ message: error.message })
  }
}
