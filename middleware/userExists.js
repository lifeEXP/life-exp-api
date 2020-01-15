const Users = require('../models/auth/auth-model')

module.exports = function (req, res, next) {
    const { username } = req.params
    Users.findBy(username).then((_user) => {
        if (!_user) {
            res.status(404).json({ messege: 'that user doesn\'t exist' })
        } else {
            req.user = _user
            next()
        }
    }).catch(() => {
        res.status(500).json({ messege: 'an ERROR occoured' })

    })
}