const { getTeams, addTeam } = require('../db/consultas')

const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await getTeams()
        res.json(equipos)
    } catch (error) {
        throw new Error("Error al obtener equipos")
    }
  
}

const agregarEquipo = async (req, res) => {
    try {
        const equipo = req.body
        await addTeam(equipo)
        res.send({ message: "Equipo agregado con éxito" })
    } catch (error) {
        throw new Error("Error al registrar equipo")
    }
  
}

module.exports = { obtenerEquipos, agregarEquipo }