var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.header('auth-token');//obtenemos el token que tenemos que mandar en las cabeceras cuando hacemos la petición a la API

    if (!token) {//si no se manda el token, entonces no lo dejamos acceder a la API
        return res.status(401).json({ error: 'Acceso denegado' })
    }else{
        //primer parametro es para el token que estamos recibiendo
        //el segundo parametro es la llave para desencriptar
        try {
            const verificar = jwt.verify(token, process.env.JWT_KEY)
            req.user = verificar
            next() // continuamos
        } catch (error) {
            res.status(400).json({error: 'token no es válido'})
        }
    }
}