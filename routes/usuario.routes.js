const { Router } = require("express");
const router = Router();

const usuarioController = require("../controller/usuario.controller");
const validarUsuario = require("../service/usuario.validation");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", validarUsuario, usuarioController.cadastrar);
router.get("/", authMiddleware(["funcionario", "admin"]), usuarioController.listarTodos);
router.get("/:id", authMiddleware(["funcionario", "admin"]), usuarioController.buscarPorId);
router.put("/:id", authMiddleware(["cliente", "funcionario", "admin"]), validarUsuario, usuarioController.atualizar);
router.delete("/:id", authMiddleware(["cliente", "admin"]), usuarioController.deletar);

module.exports = router;
