const { Router } = require("express");
const router = Router();

const authRoutes = require("./auth.routes");
const usuarioRoutes = require("./usuario.routes");
const veiculoRoutes = require("./veiculo.routes");
const propostaRoutes = require("./proposta.routes");

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/veiculos", veiculoRoutes);
router.use("/propostas", propostaRoutes);

module.exports = router;
