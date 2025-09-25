require("dotenv").config();

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: 3306,
      dialect: "mysql",
    }
);
  
sequelize.authenticate()
.then(()=>{
    console.log('Banco de dados Conectado!')
})
.catch((err)=>{
    console.error('Erro de conexão com banco de dados!',err)
})

module.exports = sequelize