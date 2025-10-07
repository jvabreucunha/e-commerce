const Joi = require('joi');

const usuarioSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  tipo: Joi.string().valid('cliente', 'funcionario', 'admin').optional(),
  cpf: Joi.string().pattern(/^\d{11}$/).required(), 
  telefone: Joi.string().pattern(/^\d{10,11}$/).required(), 
  endereco: Joi.string().optional()
});

const validarUsuario = (req, res, next) => {
  const { error } = usuarioSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = validarUsuario