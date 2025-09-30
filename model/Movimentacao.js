const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Movimentacao = sequelize.define("Movimentacao", {
  id_movimentacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_veiculo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "veiculos", key: "id_veiculo" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  id_comprador: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "usuarios", key: "id_usuario" },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  id_vendedor: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "usuarios", key: "id_usuario" },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  data_venda: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  valor_final: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  metodo_pagamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pendente", "aprovada", "cancelada"),
    allowNull: false,
    defaultValue: "pendente",
  }
}, {
  tableName: "movimentacoes",
  timestamps: false,
});

module.exports = Movimentacao;
