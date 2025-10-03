const { Router } = require("express");
const router = Router();

const authController = require('../controller/auth.controller')
const usuarioRoutes = require("./usuario.routes");
const veiculoRoutes = require("./veiculo.routes");
const propostaRoutes = require("./proposta.routes");

router.use("/auth", authController.login);
router.use("/usuarios", usuarioRoutes);
router.use("/veiculos", veiculoRoutes);
router.use("/propostas", propostaRoutes);

module.exports = router;
