const jwt = require('jsonwebtoken');

const validarToken = async (req, res, next) => {
    const Authorization = req.header("Authorization")
    

    if(Authorization){
        try {
            const token = Authorization.split("Bearer ")[1]
            const decoded = jwt.verify(token, 'az_AZ')
            req.user = decoded.username
            next()
        } catch (error) {
            res.status(401).json({ message: 'Token inválido' });
        }
    }else {
        res.status(401).json({ message: 'Token no proporcionado' });
      }

}

module.exports = validarToken
