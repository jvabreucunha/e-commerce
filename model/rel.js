const Movimentacao = require("./Movimentacao");
const Usuario = require("./Usuario");
const Veiculo = require("./Veiculo");

Usuario.hasMany(Movimentacao, {
    foreignKey: "id_usuario",
    as: "comprasCliente",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Movimentacao.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    as: "clienteCompra",
    allowNull: false,
});

Veiculo.hasMany(Movimentacao, {
    foreignKey: "id_veiculo",
    as: "movimentacoesVeiculo",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Movimentacao.belongsTo(Veiculo, {
    foreignKey: "id_veiculo",
    as: "veiculoMovimentacao",
    allowNull: false,
});

module.exports = { Usuario, Veiculo, Movimentacao };
