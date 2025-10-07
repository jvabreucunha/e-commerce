const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const LogInterno = sequelize.define("LogInterno", {
  id_log: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "usuarios", key: "id_usuario" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  acao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  entidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_referencia: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  data_acao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "logs_internos",
  timestamps: false,
});

module.exports = LogInterno;
