//auth.controller.js
const Usuario = require("../model/Usuario");
const { compareSenha } = require("../service/bcrypt.service");
const { gerarToken, verificarToken } = require("../service/jwt.service");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    const senhaValida = await compareSenha(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha inválida!" });
    }

    const token = gerarToken({
      id_usuario: usuario.id_usuario,
      email: usuario.email,
      tipo: usuario.tipo,
    });

    res.status(200).json({ message: "Login realizado com sucesso!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao realizar o login!" });
  }
};

const verify = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ sucess: false, message: "Token não fornecido" });
  }

  const tokenIsValid = await verificarToken(token);

  if (!tokenIsValid) {
    return res.status(401).json({ sucess: false, message: "Token inválido" });
  }

  return res.json({ sucess: true, message: "Token válido" })
};

module.exports = { login, verify };
