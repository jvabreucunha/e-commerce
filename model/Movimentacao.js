const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Movimentacao = sequelize.define("Movimentacao", {
  id_movimentacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_proposta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, 
    references: { model: "propostas", key: "id_proposta" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
}, {
  tableName: "movimentacoes",
  timestamps: false,
});

module.exports = Movimentacao;