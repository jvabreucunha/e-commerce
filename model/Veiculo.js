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
      allowNull: true,
    },
    categoria: {
      type: DataTypes.ENUM("sedan", "SUV", "hatch", "picape", "outro"),
      allowNull: false,
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    combustivel: {
      type: DataTypes.ENUM("gasolina", "flex", "etanol", "diesel", "eletrico"),
      allowNull: false,
    },
    cambio: {
      type: DataTypes.ENUM("manual", "automatico"),
      allowNull: false,
    },
    imagem_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("disponivel", "vendido"),
      allowNull: false,
      defaultValue: "disponivel",
    },
  },
  {
    tableName: "veiculos",
    timestamps: false,
  }
);

module.exports = Veiculo;
