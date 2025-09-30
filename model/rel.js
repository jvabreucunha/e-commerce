const Usuario = require("./Usuario");
const Veiculo = require("./Veiculo");
const Movimentacao = require("./Movimentacao");

// Usuário ↔ Movimentacao (comprador)
Usuario.hasMany(Movimentacao, {
  foreignKey: "id_comprador",
  as: "compras",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});
Movimentacao.belongsTo(Usuario, {
  foreignKey: "id_comprador",
  as: "comprador"
});

// Usuário ↔ Movimentacao (vendedor / aprovador)
Usuario.hasMany(Movimentacao, {
  foreignKey: "id_vendedor",
  as: "vendasAprovadas",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});
Movimentacao.belongsTo(Usuario, {
  foreignKey: "id_vendedor",
  as: "vendedor"
});

// Usuário ↔ Veiculo (quem cadastrou o veículo)
Usuario.hasMany(Veiculo, {
  foreignKey: "id_usuario",
  as: "veiculos",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Veiculo.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "dono"
});

// Veiculo ↔ Movimentacao
Veiculo.hasMany(Movimentacao, {
  foreignKey: "id_veiculo",
  as: "movimentacoes",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Movimentacao.belongsTo(Veiculo, {
  foreignKey: "id_veiculo",
  as: "veiculo"
});

module.exports = { Usuario, Veiculo, Movimentacao };
