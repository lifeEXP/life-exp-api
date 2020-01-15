const express = require('express')
const router = express.Router()
const expenseRouter = require('../expenses/expense-router')

const Users = require('../../models/auth/auth-model')
const UserInfo = require('../../models/user/user-model')
const userExists = require('../../middleware/userExists')

router.get('/', (req, res) => {
    const { username, email } = req.query
    if (!username && !email) {
        Users.find()
            .then((_user) => {
                if (!_user) {
                    res.status(404).json({ meessege: 'Couldn\'t Do that.... sorry try again' })
                } else {
                    res.status(200).json({ _user })
                }
            })
            .catch((_err) => {
                console.log(_err)
                res.status(500).json({ messege: 'an error has occurred please contact the author', _err })
            })
    } else {
        Users.findBy(username || email)
            .then((_user) => {
                if (!_user) {
                    res.status(404).json({ meessege: 'Couldn\'t Do that.... sorry try again' })
                } else {
                    res.status(200).json({ _user })
                }
            })
            .catch((_err) => {
                console.log(_err)
                res.status(500).json({ messege: 'an error has occurred please contact the author', _err })
            })
    }
})

router.post('/:username/addEXP', userExists, (req, res) => {
    const { username } = req.user
    const { exp } = req.body
    UserInfo.addExp(username, exp)
        .then((_exp) => {
            if (!_exp) {
                res.status(400).json({ messege: 'an error has occoured adding expense... please wait and try again later' })
            } else {
                res.status(200).json({ _exp })
            }
        }).catch((_err) => {
            console.log(_err)
            res.status(500).json({ _err })
        })
})


router.use('/:username/expenses', userExists, expenseRouter)

module.exports = router