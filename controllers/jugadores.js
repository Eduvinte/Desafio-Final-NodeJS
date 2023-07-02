const { getPlayers, addPlayer } = require('../db/consultas')

const obtenerJugadores = async (req, res) => {
    try {
        const { teamID } = req.params
        const jugadores = await getPlayers(teamID)
        const jugadoresSelect = jugadores.map(jugador => {
            return {
                name: jugador.name,
                position: jugador.position
            }      
        })
        res.json(jugadoresSelect)
    } catch (error) {
        throw new Error("Error al obtener jugadores")
    }
}

const registrarJugador = async (req, res) => {
    try {
        const { teamID, position } = req.params
        const {jugador} = req.body
        await addPlayer({ jugador, teamID, position })
        res.status(201).json({ message: "Jugador agregado con éxito" });
    } catch (error) {
        throw new Error("Error al registrar jugador")
    }
  
}


module.exports = { obtenerJugadores, registrarJugador } 