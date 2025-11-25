const Joi = require('joi');

const veiculoSchema = Joi.object({
  marca: Joi.string().required(),
  modelo: Joi.string().required(),
  ano: Joi.number().integer().required(),
  preco: Joi.number().required(),
  quilometragem: Joi.number().integer().required(),
  categoria: Joi.string().valid('sedan', 'SUV', 'hatch', 'picape', 'outro').required(),
  cor: Joi.string().required(),
  combustivel: Joi.string().valid('gasolina','flex','etanol','diesel','eletrico').required(),
  cambio: Joi.string().valid('manual','automatico').required(),
});

const validarVeiculo = (req, res, next) => {
  const { error } = veiculoSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
  
module.exports = {
    validarVeiculo,
}