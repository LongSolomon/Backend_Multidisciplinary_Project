const logController = require("../controllers/logController");

const router = require("express").Router();

// //ADD A log
// router.post("/", logController.addAlog);

//GET ALL logS BELONG TO USER
router.get("/user/:id", logController.alllogsFromUser);

//GET ALL logS
router.get("/all", logController.alllogs);

//GET All logs belong to device
router.get("/device/:id", logController.onelog);



// //DELETE A log
// router.delete("/delete/:id", logController.deletelog);

// //TURN ON/OFF THE log BY WEB APPLICATION
// router.get("/turnOnOrOff/:id", logController.turnonorofflog)

// // UPDATE <STATUS> THE log BY log SENSOR
// // for example, if the light sensor is working, which lead to turning the light off or on
// router.get("/updatelog/:id", logController.updevi) //updatelog

// // AUTOMATIC log <ON/OFF>
// router.get("/autolog/:id", logController.automodelog)
// //router.put("/updatelog/:id", logController.updatelog)

// // GETTING data from sensor and change the log status if automode is on
// router.get("/:idsensor/:idlog/:data", logController.getdatasensor);

// //TESTING BY DEPLOY GET FEED AUTO SEND DATA
// router.get("/updatelogversion/:id", logController.updevi)
module.exports = router;