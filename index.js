const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT
const hostname = process.env.HOST

const conn = require('./db/conn')
const router = require('./router')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(router)

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao sincronizar com o banco de dados!',err)
})