const { Router } = require("express");
const router = Router();

const authController = require('../controller/auth.controller')
const usuarioRoutes = require("./usuario.routes");
const veiculoRoutes = require("./veiculo.routes");
const propostaRoutes = require("./proposta.routes");
const favoritoRoutes = require("./favorito.routes");

router.use("/auth", authController.login);
router.use("/auth/verify", authController.verify);
router.use("/usuario", usuarioRoutes);
router.use("/veiculo", veiculoRoutes);
router.use("/proposta", propostaRoutes);
router.use("/favorito", favoritoRoutes);

module.exports = router;
