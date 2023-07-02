const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '689101101024Edu',
    database: 'futscript',
    allowExitOnIdle: true
})

const validateCredentials = async (username) => {
    try {
        const consulta = "SELECT * FROM users WHERE username = $1";
        const values = [username];
        const result = await pool.query(consulta, values);
        
        return result.rows.length !== 0;
    } catch (error) {
        throw new Error("Error al consultar la base de datos");
    }
};


const getTeams = async () => {
    try {
        const consulta = "SELECT * FROM equipos"
        const { rows: result } = await pool.query(consulta)
        return result
    } catch (error) {
        console.error(error)
    }

}

const getPlayers = async (teamID) => {
    try {
        const consulta = "SELECT * FROM jugadores WHERE id_equipo = $1"
        const values = [teamID]
        const { rows: result } = await pool.query(consulta, values)
        return result
    } catch (error) {
        console.error(error)
    }
}

const addTeam = async (equipo) => {
    try {
        const consulta = "INSERT INTO equipos VALUES ( DEFAULT, $1 )"
        const values = [equipo.name]
        await pool.query(consulta, values)
    } catch (error) {
        console.error(error)
    }
};

const addPlayer = async ({ jugador, teamID, position }) => {
    try {
        if (jugador, teamID, position) {
            const consulta = "INSERT INTO  jugadores VALUES (DEFAULT, $2, $1, $3)"
            const values = [jugador, teamID, position]
            console.log(values)
            await pool.query(consulta, values)
        }
    } catch (error) {
        console.error(error)
    }


}

module.exports = { getTeams, addTeam, getPlayers, addPlayer, validateCredentials }