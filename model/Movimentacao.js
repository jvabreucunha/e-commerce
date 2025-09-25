const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Movimentacao = sequelize.define("Movimentacao",
  {
    id_movimentacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data_venda: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    valor_final: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "movimentacoes",
    timestamps: false,
  }
);

module.exports = Movimentacao;
