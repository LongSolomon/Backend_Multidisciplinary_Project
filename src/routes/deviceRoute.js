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

// Turn on or off the device
router.get("/updatedevice/:id/:fanmode", deviceController.updevi)

// AUTOMATIC device <ON/OFF>
router.get("/autodevice/:id", deviceController.automodeDevice)

// GETTING data from sensor and change the device status if automode is on
router.get("/:idsensor/:iddevice/:data", deviceController.getdatasensor);

// GETTING data from sensor and change the device status if automode is on
router.post("/post/:idsensor/:iddevice", deviceController.getdatasensorpost);

router.post("/post/log/:iddevice", deviceController.getchangedevicepost);
//GETTING ALL NOTICE FOR USER
router.get("/notice/:id", deviceController.getNotice);

module.exports = router;