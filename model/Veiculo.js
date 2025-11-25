const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Veiculo = sequelize.define("Veiculo",
  {
    id_veiculo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,   
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    quilometragem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.ENUM(
        "sedan",
        "SUV",
        "hatch",
        "picape",
        "cupê",
        "conversível",
        "perua",
        "minivan",
        "van",
        "esportivo",
        "luxo",
        "offroad",
        "utilitário",
        "microcar",
        "outro"
      ),
      allowNull: false,
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    combustivel: {
      type: DataTypes.ENUM("gasolina", "flex", "etanol", "GNV", "diesel", "eletrico"),
      allowNull: false,
    },
    cambio: {
      type: DataTypes.ENUM("manual", "automatico"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("disponivel", "vendido"),
      allowNull: false,
      defaultValue: "disponivel",
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      } 
    },
  },
  {
    tableName: "veiculos",
    timestamps: false,
  }
);

module.exports = Veiculo;

