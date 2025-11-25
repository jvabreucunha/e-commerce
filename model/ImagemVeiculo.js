const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const ImagemVeiculo = sequelize.define("ImagemVeiculo",
  {
    id_imagem: {
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
    caminho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ordem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "imagem_veiculos",
    timestamps: false,
  }
);

module.exports = ImagemVeiculo;
