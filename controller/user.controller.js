const Usuario = require('../model/Usuario');
const { hashSenha } = require('../service/bcrypt.service');

const cadastrar = async (req, res) => {
    try {
      const { nome, email, senha, tipo, cpf, telefone, endereco } = req.body;
  
      if (!nome || !email || !senha || !cpf) {
        return res.status(400).json({ message: 'Campos obrigatórios: nome, email e senha' });
      }
  
      // Define cliente como padrao para evitar que clientes tentem forcar acesso admin
      let tipoFinal = 'cliente'; 
  
      if (req.usuario.tipo === 'admin' && tipo) {
        const tiposValidos = ['cliente', 'funcionario', 'admin'];
        if (!tiposValidos.includes(tipo)) {
          return res.status(400).json({ message: 'Tipo inválido' });
        }
        tipoFinal = tipo;
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
      console.error('Erro ao criar usuário:', err);
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
  
      if (nome) usuario.nome = nome;
      if (email) usuario.email = email;
      if (senha) usuario.senha = await hashSenha(senha);
      if (cpf) usuario.cpf = cpf;
      if (telefone) usuario.telefone = telefone;
      if (endereco) usuario.endereco = endereco;
  
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
