const authController = require("../controllers/authController");

const router = require("express").Router();

//LOGIN
router.post("/login", authController.loginUser);
// //ADD A PRINTER
// router.post("/", printerController.addAPrinter);

// //GET ALL PRINTERS
// router.get("/", printerController.getAllPrinter);

// //GET A PRINTER
// router.get("/:id", printerController.getAPrinter);

// //UPDATE A PRINTER
// router.put("/:id", printerController.updatePrinter);

// //DELETE A PRINTER
// router.delete("/:id", printerController.deletePrinter);

module.exports = router;