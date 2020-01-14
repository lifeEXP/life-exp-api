const express = require('express')
const server = express()
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const authRotuer = require('./routes/auth/auth-router')
const expenseRouter = require('./routes/expenses/expense-router')
server.use(cors())
server.use(helmet())
server.use(morgan('combined'))
server.use(express.json())

server.use('/auth', authRotuer)
server.use('/api', auth, expenseRouter)

const jwt = require('jsonwebtoken')
const secrets = require('./config/secrets')
function auth(req, res, next) {
    const { authorization } = req.headers
    if(authorization){
        jwt.verify(authorization, secrets.jwtSecret, (err, decodedToken)=>{
            if(err){
                res.status(401).json({messege:'couldn\'t be authorized at the time.. please try again later..'})
            }else{                
                next()
            }
        })
    }else{
        res.status(403).json({messege:'Log in!'})

    }
}
module.exports = server