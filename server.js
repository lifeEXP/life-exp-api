const express = require('express')
const server = express()
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const authRotuer = require('./routes/auth/auth-router')
const userRouter = require('./routes/user/user-router')

const isAuthorized = require('./middleware/isAuthorized')

server.use(cors())
server.use(helmet())
server.use(morgan('combined'))
server.use(express.json())


server.get('/', (req,res)=>{
    res.send('WELCOME')
})

server.use('/auth', authRotuer)
server.use('/api/users', isAuthorized, userRouter)


module.exports = server