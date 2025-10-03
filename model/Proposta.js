const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Proposta = sequelize.define("Proposta", {
  id_proposta: {
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
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  id_vendedor: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "usuarios", key: "id_usuario" },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  valor_proposta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pendente", "aprovada", "rejeitada", "cancelada"),
    allowNull: false,
    defaultValue: "pendente",
  },
  data_proposta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  data_aprovacao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  metodo_pagamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: "propostas",
  timestamps: false,
});

module.exports = Proposta;