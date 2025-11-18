const { Router } = require("express");
const router = Router();

const usuarioController = require("../controller/usuario.controller");
const validarUsuario = require("../service/usuario.validation");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", validarUsuario, usuarioController.cadastrar);
router.get("/", authMiddleware(["admin"]), usuarioController.listarTodos);
router.get("/:id", authMiddleware(["admin"]), usuarioController.buscarPorId);
router.put("/:id", authMiddleware(["cliente", "admin"]), validarUsuario, usuarioController.atualizar);
router.delete("/:id", authMiddleware(["cliente", "admin"]), usuarioController.deletar);

module.exports = router;
