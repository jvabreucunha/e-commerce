const { Router } = require("express");
const router = Router();

const veiculoController = require("../controller/veiculo.controller");
const { validarVeiculo, validarModeloQuery } = require("../service/veiculo.validation");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware(["cliente", "funcionario", "admin"]), validarVeiculo, veiculoController.cadastrar);
router.get("/", authMiddleware(["cliente", "funcionario", "admin"]), veiculoController.listarTodos);
router.get("/:id", authMiddleware(["cliente", "funcionario", "admin"]), veiculoController.buscarPorId);
router.put("/:id", authMiddleware(["cliente", "admin"]), validarVeiculo, veiculoController.atualizar);
router.get("/buscar/modelo", authMiddleware(["cliente", "funcionario", "admin"]), validarModeloQuery, veiculoController.buscarPorModelo);

module.exports = router;
