const deviceController = require("../controllers/deviceController");

const router = require("express").Router();

//ADD A DEVICE
router.post("/", deviceController.addADevice);

//GET A DEVICE
router.get("/:id", deviceController.getADevice);

//DELETE A DEVICE
router.delete("/:id", deviceController.deleteDevice);

//TURN ON/OFF THE DEVICE
router.put("/turnOnOrOff/:id", deviceController.updateDevice)
module.exports = router;