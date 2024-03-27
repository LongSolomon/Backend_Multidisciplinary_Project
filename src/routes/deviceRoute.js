const deviceController = require("../controllers/deviceController");

const router = require("express").Router();

//ADD A DEVICE
router.post("/", deviceController.addADevice);

//GET A DEVICE
router.get("/:id", deviceController.getADevice);

//UPDATE A DEVICE
router.put("/:id", deviceController.updateDevice);

//DELETE A DEVICE
router.delete("/:id", deviceController.deleteDevice);

module.exports = router;