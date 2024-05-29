import { pool } from '../db.js';

export const listTipoVehiculo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tipo_vehiculo")
    res.json(result)
      
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createTipoVehiculo = async (req, res) => {
  const { nombre, cupo } = req.body
  try {
    const query = await pool.query(
      "INSERT INTO tipo_vehiculo (nombre, cupo) VALUES (?, ?)",
      [nombre, cupo]
    )

    res.json({
      id: query.insertId,
      nombre: nombre,
      cupo: cupo
    })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateTipoVehiculo = async (req, res) => {
  const { nombre, cupo } = req.body

  try {
    await pool.query(
      "UPDATE tipo_vehiculo set nombre = ?, cupo = ? WHERE id = ?",
      [nombre, cupo, req.params.id]
    )

    res.json({ message: "Tipo vehiculo actualizada." })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteTipoVehiculo = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM tipo_vehiculo WHERE id = ?",
      [req.params.id]
    )

    res.json({ message: "Tipo vehiculo eliminado." })

  } catch (error) {
      return res.status(500).json({ message: error.message })
  }
}
