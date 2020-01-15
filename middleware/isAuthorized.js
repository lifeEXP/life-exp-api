const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')


module.exports = function (req, res, next) {
    const { authorization } = req.headers
    if (authorization) {
        jwt.verify(authorization, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ messege: 'couldn\'t be authorized at the time.. please try again later..' })
            } else {
                next()
            }
        })
    } else {
        res.status(403).json({ messege: 'Log in!' })

    }
}