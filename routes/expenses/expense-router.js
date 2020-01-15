const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense/expense-model')
const Users = require('../../models/user/user-model')

//get all expenses by username
router.get('/', (req, res) => {
     const { username } = req.user
    console.log(username)
    Expenses.findBy(username)
        .then((_exp) => {
            if (_exp) {
                res.status(200).json(_exp)
            } else {
                res.status(404).json({ messege: 'That User Doesnt Exist...' })
            }
        }).catch((_err) => {
            res.status(500).json({ messege: 'sorry something went wrong boss..' })
        })
})

//get single expense by id
router.get('/:id', (req, res) => {
    const { id} = req.params
     const { username } = req.user

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
router.post('/add', (req, res) => {
     const { username } = req.user

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


//delete an expense
router.delete('/delete/:id', (req, res) => {
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
router.put('/update/:id', (req, res) => {
     const { username } = req.user

    const { id } = req.params
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
