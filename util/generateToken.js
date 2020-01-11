const secrets = require('../config/secrets')
const jwt = require('jsonwebtoken')

module.exports = function(user){
    const payload = {
        subject:user.id,
        username:user.username,
        status:user.status
    }
    const options = {
        expiresIn:'7d'
    }
    return jwt.sign(payload, secrets.jwtSecret ,options)
}