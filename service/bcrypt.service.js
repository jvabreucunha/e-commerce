require("dotenv").config();
const bcrypt = require('bcrypt')

const SALT_ROUNDS = parseInt(process.env.SALTS)

async function hashSenha(senha){
    return await bcrypt.hash(senha, SALT_ROUNDS)
}

async function compareSenha(senha,hash){
    return await bcrypt.compare(senha,hash)
}

module.exports = { hashSenha, compareSenha }