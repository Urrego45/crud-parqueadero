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

  console.log(req.body);
  try {

    const fecha = new Date()

    const query = await pool.query(
      "INSERT INTO parqueadero (vehiculo, placa, hora_entrada) VALUES (?, ?, ?)",
      [vehiculo, placa, fecha]
    )

    res.json({
      id: query.insertId,
      vehiculo: vehiculo,
      placa: placa,
      hora_entrada: hora_entrada
    })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateParqueadero = async (req, res) => {
  const { placa, hora_salida } = req.body

  try {
    await pool.query(
      "UPDATE parqueadero set placa = ?, hora_salida = ? WHERE id = ?",
      [placa, hora_salida, req.params.id]
    )

    res.json({ message: "Parqueadero actualizado." })

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
