const authController = require("../controllers/authController");

const router = require("express").Router();

//LOGIN
router.post("/login", authController.loginUser);
module.exports = router;