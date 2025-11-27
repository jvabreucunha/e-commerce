const { Router } = require("express");
const router = Router();

const authRoutes = require("./auth.routes");
const usuarioRoutes = require("./usuario.routes");
const veiculoRoutes = require("./veiculo.routes");
const propostaRoutes = require("./proposta.routes");
const favoritoRoutes = require("./favorito.routes");

router.use("/auth", authRoutes);
router.use("/usuario", usuarioRoutes);
router.use("/veiculo", veiculoRoutes);
router.use("/proposta", propostaRoutes);
router.use("/favorito", favoritoRoutes);

module.exports = router;
