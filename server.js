const express = require('express')
const cors = require('cors')
const server = express()
const morgan = require('morgan')
const helmet = require('helmet')

server.use(cors())
server.use(helmet())
server.use(morgan('combined'))
server.use(express.json())

const authRotuer = require('./auth/auth-router')

server.use('/auth', authRotuer)

module.exports = server