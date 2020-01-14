const express = require('express')

const router = express.Router()
const Users = require('../../models/auth/auth-model')
const bcrypt = require('bcrypt')
const generateToken = require('../../util/generateToken')
const Infos = require('../../models/user/user-model')
router.get('/users/all/debug', (req, res) => {
    Users.find()
        .then((_user) => {
            if (!_user) {
                res.status(404).json({ meessege: 'Couldn\'t Do that.... sorry try again' })

            } else {

                res.status(200).json({ _user })
            }
        })
        .catch((_err) => {
            res.status(500).json({ messege: 'an error has occurred please contact the author', _err })
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    Users.findBy(username)
        .then((_user) => {
            if (_user && bcrypt.compareSync(password, _user.password)) {
                const token = generateToken(_user)
                const logged_in_user = {
                    id: _user.id,
                    username: _user.username
                }
                res.status(200).json({ messege: `user logged in successful:: Welcome ${_user.username} heres a token:`, token, logged_in_user })
            } else {
                res.status(404).json({ meessege: 'Couldn\'t Log you in.. sorry try again' })
            }
        }).catch((_err) => {
            res.status(500).json({ messege: 'an error has occurred please contact the author', _err })
        })
})

router.post('/register', (req, res) => {
    var user = req.body
    console.log(user)
    const hash = bcrypt.hashSync(user.password, 12)
    user = {
        ...user,
        password: hash
    }
    Users.add(user).then((_user) => {
        if (!_user) {
            res.status(400).json({ messege: 'sorry something appears to be wrong' })
        } else {
            Infos.addInfo(user.username).then(() => {
                console.log('im making it here boss..')
                res.status(201).json({ messege: 'user created successfuly!' })
            }).catch((_err) => {
                console.log(_err)
                res.status(500).json({ messege: 'an error has occoured in creating user information', _err })
            })
        }
    }).catch((_err) => {
        console.log(_err)
        res.status(500).json({ messege: 'an error has occurred please contact the author', _err })
    })
})


module.exports = router