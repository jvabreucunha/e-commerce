const { Router } = require("express")
const router = Router()

const { validarVeiculo, validarModeloQuery } = require('./service/veiculo.validation');
const validarUsuario = require('./service/usuario.validation.js');
const veiculoController = require('./controller/veiculo.controller');
const usuarioController = require('./controller/usuario.controller');
const authMiddleware = require('./middleware/auth.middleware');
const authController = require('./controller/auth.controller.js')

router.post('/login', authController.login)

router.post('/usuario', validarUsuario, usuarioController.cadastrar)
router.get('/usuario', authMiddleware(["funcionario", "admin"]), usuarioController.listarTodos)
router.get('/usuario:id', authMiddleware(["funcionario", "admin"]), usuarioController.buscarPorId)
router.put('/usuario:id', authMiddleware(["cliente", "funcionario", "admin"]), validarUsuario, usuarioController.atualizar)
router.delete('/usuario:id', authMiddleware(["cliente", "admin"]), usuarioController.deletar)

router.post('/veiculos', authMiddleware(["cliente", "funcionario", "admin"]), validarVeiculo, veiculoController.cadastrar);
router.get('/veiculos', authMiddleware(["cliente", "funcionario", "admin"]), veiculoController.listarTodos);
router.get('/veiculos:id', authMiddleware(["cliente", "funcionario", "admin"]), veiculoController.buscarPorId);
router.put('/veiculos/:id', authMiddleware(["cliente", "admin"]), validarVeiculo, veiculoController.atualizar);
router.get('/veiculos/buscar', authMiddleware(["cliente", "funcionario", "admin"]), validarModeloQuery, veiculoController.buscarPorModelo);

module.exports = router
