const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense/expense-model')
const Users = require('../../models/user/user-model')

//get all expenses...
router.get('/expenses/all', (req, res) => {
    Expenses.find()
        .then(_exp => {
            res.status(200).json(_exp)
        })
        .catch(_err => {
            res.status(500).json({ messege: 'sorry something went wrong boss..' })
        })
})

//get all expenses by username
router.get('/:username/expenses', (req, res) => {
    const { username } = req.params
    Expenses.findBy(username)
        .then((_exp) => {
            if (_exp) {
                res.status(200).json(_exp)
            } else {
                res.status(403).json({ messege: 'something went wrong..' })
            }
        }).catch((_err) => {
            res.status(500).json({ messege: 'sorry something went wrong boss..' })
        })
})

//get single expense by id
router.get('/:username/expenses/current/:id', (req, res) => {
    const { id, username } = req.params
    console.log(id)
    Expenses.findBy(username)
        .then(() => {
            Expenses.findById(id)
                .then((_exp) => {
                    if (_exp) {
                        res.status(200).json({ _exp })
                    } else {
                        res.status(400).json({ messege: 'that expense doesnt exist..' })
                    }
                }).catch((_err) => {
                    res.status(500).json({ messege: 'sorry that id doesnt exist' })
                })
        }).catch((_err) => {
            console.log(_err)
            res.status(500).json({ messege: 'sorry couldnt find user with that username' })
        })
})



//add an expense
router.post('/:username/expenses/add', (req, res) => {
    const { username } = req.params
    let expense = req.body
    expense = {
        ...expense,
        owner: username
    }

    Expenses.add(expense)
        .then((_exp) => {
            if (!_exp) {
                res.status(400).json({ messege: 'an error has occoured adding expense... please wait and try again later' })
            } else {
                res.status(201).json({ messege: 'created Succesfuly!', _exp })
            }
        }).catch((_err) => {
            res.status(500).json({ _err })
        })
})
// ************************* THIS NEEDS TO BE REFACTORED TO ITS OWN AREA
router.post('/:username/addEXP', (req, res) => {
    const { username } = req.params
    const { exp } = req.body
    Users.addExp(username, exp)
        .then((_exp) => {
            if (!_exp) {
                res.status(400).json({ messege: 'an error has occoured adding expense... please wait and try again later' })
            } else {
                res.status(200).json({_exp })
            }
        }).catch((_err) => {
            console.log(_err)
            res.status(500).json({ _err })
        })
})

//delete an expense
router.delete('/:username/expenses/delete/:id', (req, res) => {
    const { id } = req.params
    Expenses.remove(id)
        .then((_exp) => {
            if (_exp) {
                res.status(200).json({ messege: 'deleted Succesfuly!' })
            } else {
                res.status(400).json({ messege: 'an error has occoured deleting expense... please wait and try again later' })
            }
        })
        .catch((_err) => {
            res.status(500).json({ _err })
        })
})
//update an expense
router.put('/:username/expenses/update/:id', (req, res) => {
    const { id, username } = req.params
    let changes = req.body
    changes = {
        ...changes,
        owner: username
    }
    Expenses.findBy(username).then(() => {

        Expenses.update(id, changes)
            .then((_exp) => {
                if (_exp) {
                    res.status(200).json({ messege: 'updated Succesfuly!', _exp })
                } else {
                    res.status(400).json({ messege: 'an error has occoured updating expense... please wait and try again later' })
                }
            })
            .catch((_err) => {
                console.log(_err)
                res.status(500).json({ _err })
            })
    })
        .catch((_err) => {
            console.log(_err)
            res.status(500).json({ _err })
        })
})

module.exports = router
