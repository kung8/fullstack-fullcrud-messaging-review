require('dotenv/config')
const express = require('express')
const massive = require('massive')

const {SERVER_PORT, CONNECTION_STRING} = process.env
const ctrl = require('./controller')

const app = express()
app.use(express.json())

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db) //setting this on req object
    app.listen(SERVER_PORT,()=>console.log(`running successfully on port ${SERVER_PORT}`))
})

//ENDPOINT
app.get('/api/getMessages',ctrl.get)
app.post('/api/createMessage',ctrl.post)
app.put('/api/updateMessage/:message_id',ctrl.update)
app.delete('/api/deleteMessage/:message_id',ctrl.delete)
app.post('/api/login',ctrl.login)