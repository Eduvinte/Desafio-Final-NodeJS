const express = require('express');
const app = express();

app.listen(3001, console.log("SERVER ON"));
app.use(express.json())

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos')
const { loginUser } = require('./controllers/login')

const validarToken = require('./middleware/validarToken')


app.get("/equipos", obtenerEquipos)
app.post("/equipos", validarToken, agregarEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)

app.post("/equipos/:teamID/jugadores/:position", validarToken, registrarJugador)

app.post('/login', loginUser)

module.exports = app