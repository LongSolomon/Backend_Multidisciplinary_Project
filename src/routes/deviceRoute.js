const deviceController = require("../controllers/deviceController");

const router = require("express").Router();

//ADD A DEVICE
router.post("/", deviceController.addADevice);

//GET A DEVICE
router.get("/:id", deviceController.getADevice);

//DELETE A DEVICE
router.delete("/:id", deviceController.deleteDevice);

//TURN ON/OFF THE DEVICE BY WEB APPLICATION
router.put("/turnOnOrOff/:id", deviceController.turnonoroffDevice)

// UPDATE <STATUS> THE DEVICE BY DEVICE SENSOR
// for example, if the light sensor is working, which lead to turning the light off or on
router.put("/updatedevice/:id", deviceController.updateDevice)


module.exports = router;