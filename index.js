require("dotenv").config();
const express = require('express')
const cors = require('cors')
const path = require("path");
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit');

const app = express()

const PORT = process.env.PORT
const hostname = process.env.HOST

const conn = require('./db/conn')

const router = require('./routes/router')

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100,
  message: 'Você excedeu o limite de requisições. Tente novamente mais tarde.'
});

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors())
app.use(limiter);   
app.use(router)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao sincronizar com o banco de dados!',err)
})