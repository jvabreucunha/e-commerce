require("dotenv").config();
const jwt = require('jsonwebtoken')


function gerarToken(payload){
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '3h'})
}

function verificarToken(token){
    try{
        return jwt.verify(token, process.env.SECRET)
    }catch(err){
        console.error('Erro ao verificar o token')
        return null
    }
}

module.exports = { gerarToken, verificarToken }
