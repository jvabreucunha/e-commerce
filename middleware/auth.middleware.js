const { verificarToken } = require('../service/jwt.service');

function authMiddleware(permissoes = []) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido!' });

    const token = authHeader;
    const dadosToken = verificarToken(token);
    if (!dadosToken) return res.status(403).json({ error: 'Token inválido!' });

    if (permissoes.length && !permissoes.includes(dadosToken.tipo)) {
      return res.status(403).json({ error: 'Acesso negado!' });
    }

    req.usuario = dadosToken; 
    next();
  };
}

module.exports = authMiddleware;
