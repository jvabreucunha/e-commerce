require("dotenv").config();
const bcrypt = require('bcrypt')

async function hashSenha(senha){
    return await bcrypt.hash(senha, process.env.SALTS)
}

async function compareSenha(senha,hash){
    return await bcrypt.compare(senha,hash)
}

module.exports = { hashSenha, compareSenha }