const { Router } = require("express");
const router = Router();

const authController = require('../controller/auth.controller')

router.post("/", authController.login);
router.get("/verify", authController.verify);

module.exports = router;
