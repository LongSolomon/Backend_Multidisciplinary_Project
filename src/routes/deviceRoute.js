const deviceController = require("../controllers/deviceController");

const router = require("express").Router();

//ADD A DEVICE
router.post("/", deviceController.addADevice);

//GET A DEVICE
router.get("/:id", deviceController.getADevice);

//GET ALL DEVICES BELONG TO USER
router.get("/all/:id", deviceController.getAllDevices);

//DELETE A DEVICE
router.delete("/delete/:id", deviceController.deleteDevice);

//TURN ON/OFF THE DEVICE BY WEB APPLICATION
router.get("/turnOnOrOff/:id", deviceController.turnonoroffDevice)

// UPDATE <STATUS> THE DEVICE BY DEVICE SENSOR
// for example, if the light sensor is working, which lead to turning the light off or on
router.get("/updatedevice/:id", deviceController.updevi) //updateDevice

// AUTOMATIC device <ON/OFF>
router.get("/autodevice/:id", deviceController.automodeDevice)
//router.put("/updatedevice/:id", deviceController.updateDevice)

// GETTING data from sensor and change the device status if automode is on
router.get("/:idsensor/:iddevice/:data", deviceController.getdatasensor);

//TESTING BY DEPLOY GET FEED AUTO SEND DATA
router.get("/updatedeviceversion/:id", deviceController.updevi)
module.exports = router;