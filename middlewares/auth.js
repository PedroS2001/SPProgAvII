const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');


const verifyToken = async (req, res, next) => {

    const bearerToken = req.headers['authorization'];
    if (typeof bearerToken !== 'undefined') {
        req.token = bearerToken.split(" ")[1];
        try {
            const data = await jwt.verify(req.token, SECRET);
            console.log(data);
            next();

        } catch (error) {
            res.status(401).json({ error: "Token invalido" });
        }
    }
    else {
        res.status(401).json({ error: "Se requiere token" });
    }
}

module.exports = {
    verifyToken
}