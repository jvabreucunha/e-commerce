const { Op, Sequelize } = require("sequelize");
const redis = require("../service/redis.service");
const Veiculo = require('../model/Veiculo');

const cadastrar = async (req, res) => {
  try {

    if (!req.usuario || !req.usuario.id_usuario) {
      return res.status(401).json({ message: "Autenticação necessária para cadastrar veículo." });
    }

    const { marca, modelo, ano, preco, descricao, quilometragem, categoria, cor, combustivel, cambio, imagem_url } = req.body;

    const id_usuario = req.usuario.id_usuario;

    const veiculo = await Veiculo.create({marca, modelo, ano, preco, descricao, quilometragem, categoria, cor, combustivel, cambio, imagem_url, id_usuario});
    
    res.status(201).json({ message: "Veículo cadastrado com sucesso!", veiculo });
  } catch (err) {
    console.error("Erro ao cadastrar veículo:", err);
    res.status(500).json({ message: "Erro ao cadastrar veículo" });
  }
};

const listarTodos = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll();
    res.status(200).json(veiculos);
  } catch (err) {
    console.error("Erro ao listar veículos:", err);
    res.status(500).json({ message: "Erro ao listar veículos" });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) return res.status(404).json({ message: "Veículo não encontrado" });

    res.status(200).json(veiculo);
  } catch (err) {
    console.error("Erro ao buscar veículo:", err);
    res.status(500).json({ message: "Erro ao buscar veículo" });
  }
};


const buscarPorModelo = async (req, res) => {
    try {
      const { modelo } = req.query;
      if (!modelo) {
        return res.status(400).json({ message: "O parâmetro 'modelo' é obrigatório." });
      }
      
      const modeloLower = modelo.toLowerCase();
      const cacheKey = `veiculo:modelo:${modeloLower}`;

      const cacheData = await redis.get(cacheKey)
      if (cacheData) {
        await redis.zIncrBy("veiculos:ranking", 1, modeloLower);
        return res.status(200).json(JSON.parse(cacheData));
      }

      const veiculo = await Veiculo.findAll({
        where: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("modelo")),
          { [Op.like]: `%${modeloLower}%` }
        )
      });
  
      if (veiculo.length === 0) {
        return res.status(404).json({ message: "Nenhum veículo encontrado" });
      }
  
      await redis.setEx(cacheKey, 300, JSON.stringify(veiculo))
      await redis.zIncrBy("veiculos:ranking", 1, modeloLower);

      res.status(200).json(veiculo);
    } catch (err) {
      console.error("Erro ao buscar veículos:", err);
      res.status(500).json({ message: "Erro ao buscar veículos." });
    }
};

const buscarMaisBuscados = async (req, res) => {
    try {
      const ranking = await redis.zRangeWithScores("veiculos:ranking", 0, 9, { REV: true });
      
      res.status(200).json(ranking.map(item => ({
        modelo: item.value,
        buscas: item.score
      })));
    } catch (err) {
      console.error("Erro ao buscar mais buscados:", err);
      res.status(500).json({ message: "Erro ao buscar ranking de veículos" });
    }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, ano, preco, quilometragem, categoria, cor, combustivel, cambio, imagem_url} = req.body;
    const veiculo = await Veiculo.findByPk(id);
    

    if (!veiculo) return res.status(404).json({ message: "Veículo não encontrado" });

    if (req.usuario.tipo !== 'admin' && req.usuario.id_usuario !== veiculo.id_usuario) {
      return res.status(403).json({ message: 'Você não tem permissão para atualizar este veículo' });
    }
    
    await veiculo.update({ marca, modelo, ano, preco, descricao, quilometragem, categoria, cor, combustivel, cambio, imagem_url });
    
    await redis.del(`veiculo:modelo:${veiculo.modelo.toLowerCase()}`);

    res.status(200).json({ message: "Veículo atualizado com sucesso!", veiculo });
  } catch (err) {
    console.error("Erro ao atualizar veículo:", err);
    res.status(500).json({ message: "Erro ao atualizar veículo" });
  }
};

const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) return res.status(404).json({ message: "Veículo não encontrado" });

    if (req.usuario.tipo !== 'admin' && req.usuario.id_usuario !== veiculo.id_usuario) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar este veículo' });
    }

    await veiculo.destroy();

    await redis.del(`veiculo:modelo:${veiculo.modelo.toLowerCase()}`);
    await redis.zRem("veiculos:ranking", veiculo.modelo.toLowerCase());

    res.status(200).json({ message: "Veículo removido com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar veículo:", err);
    res.status(500).json({ message: "Erro ao deletar veículo" });
  }
};

module.exports = { cadastrar, listarTodos, buscarPorId, buscarPorModelo, buscarMaisBuscados, atualizar, deletar };
