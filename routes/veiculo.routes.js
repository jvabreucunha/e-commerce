const { Router } = require("express");
const router = Router();

const veiculoController = require("../controller/veiculo.controller");
const { validarVeiculo, validarModeloQuery } = require("../service/veiculo.validation");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware(["cliente", "admin"]), validarVeiculo, veiculoController.cadastrar);
router.get("/", authMiddleware(["cliente", "admin"]), veiculoController.listarTodos);
router.get("/:id", authMiddleware(["cliente", "admin"]), veiculoController.buscarPorId);
router.put("/:id", authMiddleware(["cliente", "admin"]), validarVeiculo, veiculoController.atualizar);
router.get("/buscar/modelo", authMiddleware(["cliente", "admin"]), validarModeloQuery, veiculoController.buscarPorModelo);

module.exports = router;
