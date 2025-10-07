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
    allowNull: true, 
    references: {
      model: "usuarios",
      key: "id_usuario",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  acao: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  endpoint: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ip: {
    type: DataTypes.STRING(45), 
    allowNull: true,
  },
  detalhes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  data_log: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "logs_internos",
  timestamps: false,
});

module.exports = LogInterno;
