const { Sequelize } = require("sequelize");
const Usuario = require('../model/Usuario');
const { hashSenha } = require('../service/bcrypt.service');

const cadastrar = async (req, res) => {
    try {
      const { nome, email, senha, tipo, cpf, telefone, endereco } = req.body;
  
      let tipoFinal = 'cliente'; 
  
      if (req.headers['authorization']) {
        try {
          const authHeader = req.headers['authorization'];
          const token = authHeader.split(' ')[1];
          const dadosToken = verificarToken(token);
      
          if (dadosToken && dadosToken.tipo === 'admin' && tipo) {
            const tiposValidos = ['cliente','funcionario','admin'];
            if (!tiposValidos.includes(tipo)) {
              return res.status(400).json({ message: 'Tipo inválido' });
            }
            tipoFinal = tipo;
          }
        } catch (err) {
          tipoFinal = 'cliente';
        }
      }
  
      const senhaHash = await hashSenha(senha);
  
      const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        tipo: tipoFinal,
        cpf,
        telefone,
        endereco
      });
  
      res.status(201).json({
        message: 'Usuário criado com sucesso!',   
        usuario: {
            id_usuario: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
            cpf: usuario.cpf,
            telefone: usuario.telefone,
            endereco: usuario.endereco
        }});
    } catch (err) {
      if (err instanceof Sequelize.UniqueConstraintError) {
        // Pega o campo que violou a constraint
        const campo = err.errors[0].path;
        return res.status(400).json({ message: `${campo} já está em uso. Por favor, escolha outro.` });
      }

      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};
  
const listarTodos = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['senha'] }
    });
    res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['senha'] }
    });

    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.status(200).json(usuario);
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

const atualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, senha, tipo, cpf, telefone, endereco } = req.body;
  
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
  
      if (req.usuario.tipo !== 'admin' && req.usuario.id_usuario !== usuario.id_usuario) {
        return res.status(403).json({ message: 'Você não tem permissão para atualizar este usuário' });
      }

      if (senha) usuario.senha = await hashSenha(senha);

      usuario.update({nome, email, cpf, telefone, endereco})
  
      if (tipo && req.usuario.tipo === 'admin') {
        const tiposValidos = ['cliente', 'funcionario', 'admin'];
        if (!tiposValidos.includes(tipo)) {
          return res.status(400).json({ message: 'Tipo inválido' });
        }
        usuario.tipo = tipo;
      }
  
      await usuario.save();
      res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario });
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};
  

const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    if (req.usuario.tipo !== 'admin' && req.usuario.id_usuario !== usuario.id_usuario) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar este usuário' });
    }

    await usuario.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

module.exports = {
  cadastrar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar
};
