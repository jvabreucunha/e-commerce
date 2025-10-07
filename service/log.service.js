const LogInterno = require("../model/LogInterno");

async function registrarLog({ id_usuario, acao, entidade, id_referencia, descricao }) {
  try {
    await LogInterno.create({
      id_usuario,
      acao,
      entidade,
      id_referencia,
      descricao,
    });
  } catch (err) {
    console.error("Erro ao registrar log interno:", err.message);
  }
}

module.exports = { registrarLog };
