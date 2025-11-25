const Usuario = require("./Usuario");
const Veiculo = require("./Veiculo");
const Movimentacao = require("./Movimentacao");
const Proposta = require("./Proposta");
const ImagemVeiculo = require("./ImagemVeiculo");
const Favorito = require("./Favorito");

Usuario.hasMany(Movimentacao, {
  foreignKey: "id_comprador",
  as: "compras",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Movimentacao.belongsTo(Usuario, {
  foreignKey: "id_comprador",
  as: "comprador",
});

Usuario.hasMany(Movimentacao, {
  foreignKey: "id_vendedor",
  as: "vendasAprovadas",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Movimentacao.belongsTo(Usuario, {
  foreignKey: "id_vendedor",
  as: "vendedor",
});

Usuario.hasMany(Veiculo, {
  foreignKey: "id_usuario",
  as: "veiculos",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Veiculo.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "dono",
});

Veiculo.hasMany(Movimentacao, {
  foreignKey: "id_veiculo",
  as: "movimentacoes",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Movimentacao.belongsTo(Veiculo, {
  foreignKey: "id_veiculo",
  as: "veiculo",
});

Usuario.hasMany(Proposta, {
  foreignKey: "id_comprador",
  as: "propostasFeitas",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Proposta.belongsTo(Usuario, {
  foreignKey: "id_comprador",
  as: "comprador",
});

Usuario.hasMany(Proposta, {
  foreignKey: "id_vendedor",
  as: "propostasAprovadas",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Proposta.belongsTo(Usuario, {
  foreignKey: "id_vendedor",
  as: "vendedor",
});

Veiculo.hasMany(Proposta, {
  foreignKey: "id_veiculo",
  as: "propostas",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Proposta.belongsTo(Veiculo, {
  foreignKey: "id_veiculo",
  as: "veiculo",
});

Proposta.hasOne(Movimentacao, {
  foreignKey: "id_proposta",
  as: "movimentacao",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Movimentacao.belongsTo(Proposta, {
  foreignKey: "id_proposta",
  as: "proposta",
});

Veiculo.hasMany(ImagemVeiculo, {
  foreignKey: "id_veiculo",
  as: "imagens",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ImagemVeiculo.belongsTo(Veiculo, {
  foreignKey: "id_veiculo",
  as: "veiculo"
});

Usuario.hasMany(Favorito, {
  foreignKey: "id_usuario",
  as: "favoritos",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Favorito.belongsTo(Usuario, {
  foreignKey: "id_usuario",
});

module.exports = {
  Usuario,
  Veiculo,
  Movimentacao,
  Proposta,
  ImagemVeiculo,
  Favorito,
};
