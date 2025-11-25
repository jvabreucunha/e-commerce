const { Router } = require("express");
const router = Router();

const veiculoController = require("../controller/veiculo.controller");
const { validarVeiculo } = require("../service/veiculo.validation");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require('../service/multer.service')

router.post("/", authMiddleware(["cliente", "admin"]), validarVeiculo, upload.array("imagens", 5), veiculoController.cadastrar);
router.get("/", authMiddleware(["cliente", "admin"]), veiculoController.listarTodos);
router.get("/buscar", authMiddleware(["cliente", "admin"]), veiculoController.buscarPorModelo);
router.get("/mais-buscados", authMiddleware(["cliente", "admin"]), veiculoController.buscarMaisBuscados);
router.get("/:id", authMiddleware(["cliente", "admin"]), veiculoController.buscarPorId);
router.put("/:id", authMiddleware(["cliente", "admin"]), validarVeiculo, veiculoController.atualizar);

module.exports = router;
