const { Proposta, Veiculo, Movimentacao } = require("../model");

const criarProposta = async (req, res) => {
  try {

    const { id_veiculo, valor_proposta, metodo_pagamento, observacoes } = req.body;

    const veiculo = await Veiculo.findByPk(id_veiculo);
    if (!veiculo) {
      return res.status(404).json({ message: "Veículo não encontrado." });
    }

    if (veiculo.id_usuario === req.usuario.id_usuario) {
      return res.status(400).json({ message: "Você não pode enviar proposta para o seu próprio veículo." });
    }

    const proposta = await Proposta.create({
      id_veiculo,
      id_comprador: req.usuario.id_usuario,
      id_vendedor: veiculo.id_usuario,
      valor_proposta,
      metodo_pagamento,
      observacoes,
      status: "pendente"
    });

    res.status(201).json({ message: "Proposta enviada com sucesso!", proposta });
  } catch (err) {
    console.error("Erro ao criar proposta:", err);
    res.status(500).json({ message: "Erro ao criar proposta." });
  }
};

const responderProposta = async (req, res) => {
    try {
      const { id } = req.params; 
      const { status } = req.body; 
  
      const proposta = await Proposta.findByPk(id);
      if (!proposta) return res.status(404).json({ message: "Proposta não encontrada." });
  
      if (proposta.id_vendedor !== req.usuario.id_usuario) {
        return res.status(403).json({ message: "Você não tem permissão para responder esta proposta." });
      }
  
      proposta.status = status;
      proposta.data_aprovacao = status === "aprovada" ? new Date() : null;
      await proposta.save();
  
      if (status === "aprovada") {
        await Movimentacao.create({ id_proposta: proposta.id_proposta });
      }
  
      res.status(200).json({ message: `Proposta ${status} com sucesso.`, proposta });
    } catch (err) {
      console.error("Erro ao responder proposta:", err);
      res.status(500).json({ message: "Erro ao responder proposta." });
    }
};

const cancelarProposta = async (req, res) => {
    try {
      const { id } = req.params;
  
      const proposta = await Proposta.findByPk(id);
      if (!proposta) return res.status(404).json({ message: "Proposta não encontrada." });
  
      if (proposta.id_comprador !== req.usuario.id_usuario) {
        return res.status(403).json({ message: "Você não tem permissão para cancelar esta proposta." });
      }

      await proposta.destroy();
  
      res.status(200).json({ message: "Proposta cancelada com sucesso.", proposta });
    } catch (err) {
      console.error("Erro ao cancelar proposta:", err);
      res.status(500).json({ message: "Erro ao cancelar proposta." });
    }
};

module.exports = { criarProposta, responderProposta, cancelarProposta };
