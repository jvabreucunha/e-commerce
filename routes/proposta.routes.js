const { Router } = require("express");
const router = Router();

const propostaController = require("../controller/proposta.controller");
const {
  validarCriarProposta,
  validarResponderProposta,
  validarCancelarProposta
} = require("../service/proposta.validation");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware(["cliente"]), validarCriarProposta, propostaController.criarProposta);
router.patch("/:id/responder", authMiddleware(["cliente", "funcionario", "admin"]), validarResponderProposta, propostaController.responderProposta);
router.delete("/:id/cancelar", authMiddleware(["cliente"]), validarCancelarProposta, propostaController.cancelarProposta);

module.exports = router;
