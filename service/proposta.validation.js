const Joi = require("joi");

const criarPropostaSchema = Joi.object({
  id_veiculo: Joi.number().integer().required(),
  valor_proposta: Joi.number().positive().required(),
  metodo_pagamento: Joi.string()
    .valid("pix", "boleto", "cartao", "dinheiro")
    .required(),
  observacoes: Joi.string().allow("").optional()
});

const responderPropostaSchema = Joi.object({
  status: Joi.string().valid("aprovada", "rejeitada").required()
});

const cancelarPropostaSchema = Joi.object({
  motivo: Joi.string().allow("").optional()
});

const validar = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

const validarCriarProposta = validar(criarPropostaSchema);
const validarResponderProposta = validar(responderPropostaSchema);
const validarCancelarProposta = validar(cancelarPropostaSchema);

module.exports = {
  validarCriarProposta,
  validarResponderProposta,
  validarCancelarProposta
};
