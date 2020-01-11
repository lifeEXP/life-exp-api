const express = require('express')

const router = express.Router()
const Users = require('../models/auth/auth-model')
const bcrypt = require('bcrypt')
const generateToken = require('../util/generateToken')

router.post('/login', (req, res) => {
    const { email, username, password } = req.body
    Users.findBy(username || email)
        .then((_user) => {
            if (_user && bcrypt.compareSync(password, _user.password)) {
                const token = generateToken(_user)
                res.status(200).json({ messege: `user logged in successful:: Welcome ${_user.username} heres a token:`, token})
            } else {
                res.status(404).json({ meessege: 'Couldn\'t Log you in.. sorry try again' })
            }
        }).catch((_err) => {
            res.status(500).json({ messege: 'an error has occurred please contact the author', _err })
        })
})

router.post('/register', (req, res) => {
    var user = req.body
    const hash = bcrypt.hashSync(user.password, 12)
    user = {
        ...user,
        password: hash
    }
    Users.add(user).then((_user) => {
        if (!_user) {
            res.status(400).json({ messege: 'sorry something appears to be wrong' })
        } else {
            res.status(201).json({ messege: 'user created successfuly!', _user })
        }
    }).catch((_err) => {
        res.status(500).json({ messege: 'an error has occurred please contact the author', _err })
    })
})


module.exports = router