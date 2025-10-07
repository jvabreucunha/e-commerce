const { Router } = require("express");
const router = Router();

const authController = require('../controller/auth.controller')
const usuarioRoutes = require("./usuario.routes");
const veiculoRoutes = require("./veiculo.routes");
const propostaRoutes = require("./proposta.routes");
const favoritoRoutes = require("./favorito.routes");

router.use("/auth", authController.login);
router.use("/usuarios", usuarioRoutes);
router.use("/veiculos", veiculoRoutes);
router.use("/propostas", propostaRoutes);
router.use("/favoritos", favoritoRoutes);

module.exports = router;
