const jwt = require('jsonwebtoken')
const { validateCredentials } = require('../db/consultas')
const { secretKey } = require('../utils')

//const validarToken = require('../middleware/validarToken')

const loginUser = async (req, res) => { 
    try {
        const { username } = req.body;
        
        const validCredentials = await validateCredentials(username);
        
        if (validCredentials) {
            const token = jwt.sign({ username }, secretKey);
            res.send(token);
        } else {
            res.status(400).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        throw new Error("Error al intentar iniciar sesión");
    }
};

module.exports = { loginUser }