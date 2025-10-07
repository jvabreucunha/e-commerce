const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth.middleware");
const favoritoController = require("../controller/favorito.controller");

router.post("/:id_veiculo", authMiddleware(["cliente", "funcionario", "admin"]), favoritoController.alternarFavorito);
router.get("/", authMiddleware(["cliente", "funcionario", "admin"]), favoritoController.listarFavoritos);

module.exports = router;
