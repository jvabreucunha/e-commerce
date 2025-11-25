const conn = require('./db/conn')
const { Usuario, Veiculo, Movimentacao, Proposta, ImagemVeiculo, Favorito } = require('./model/rel')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('Tabelas Sincronizadas!')
    }catch(err){
        console.error('Erro ao sincronizar tabelas!',err)
    }finally{
        conn.close()
        console.log('Fechando conexão com banco de dados!')
    }
}

syncDataBase()