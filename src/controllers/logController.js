const logService = require("../services/logService");
const logController = {
//   // ADD A log
//   addAlog: async (req, res) => {
//     try {
//       const Anewlog = await logService.addnewlog(req) 
//       res.status(200).json(Anewlog);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

  //GET A log
  onelog: async (req, res) => {
    try {
      const log = await logService.findLogByID(req.params.id);
      res.status(200).json(log);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  alllogs: async (req, res) => {
    try {
      const allLogs = await logService.getAllLogs();
      res.status(200).json(allLogs);
    } catch (err) {
      res.status(500).json(err);
    }
    // res.status(200).json("allLogs");
  },

  alllogsFromUser: async (req, res) => {
    try {
      const allLogsFromUser = await logService.getAllLogsFromUser(req.params.id);
      res.status(200).json(allLogsFromUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

//   //TURN ON OR OFF log BY WEB APP
//   turnonorofflog: async (req, res) => {
//     try {
//       const log = await logService.Updatinglog(req.params.id);
//       res.status(200).json("Updated successfully !");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // UPDATE BY log SENSOR
//   updatelog: async (req, res) => {
//     try {
//       const log = await logService.changelogstatus(req);
//       res.status(200).json("Updated successfully !");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   updevi: async (req, res) => {
//     try {
//       const log = await logService.upvicestatus(req);
//       res.status(200).json("Updated successfully !");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   automodelog: async (req, res) => {
//     try {
//       const log = await logService.changelogauto(req);
//       res.status(200).json("Updated successfully !");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
//   //getdata
//   getdatasensor: async (req, res) => {
//     try {
//       const log = await logService.checkdataforlog(req.params.idsensor,req.params.idlog,req.params.data);
//       res.status(200).json("send successfully !");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
//   //DELETE log
//   deletelog: async (req, res) => {
//     try {
//       await logService.findByIdAndDeleteit(req.params.id);
//       res.status(200).json("Deleted successfully !");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },


};

module.exports = logController;