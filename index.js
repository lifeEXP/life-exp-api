require('dotenv').config()

const server = require('./server')

const PORT = process.env.PORT || 5000


server.listen(PORT, () => {
    console.log(`SERVER OPEN ON PORT ${PORT}`)
})