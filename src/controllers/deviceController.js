const deviceService = require("../services/deviceService");
const deviceController = {
  // ADD A DEVICE
  addADevice: async (req, res) => {
    try {
      const AnewDevice = await deviceService.addnewdevice(req) 
      res.status(200).json(AnewDevice);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A DEVICE
  getADevice: async (req, res) => {
    try {
      const device = await deviceService.finditbyID(req.params.id);
      res.status(200).json(device);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //UPDATE DEVICE
  updateDevice: async (req, res) => {
    try {
      const device = await deviceService.Updatingdevice(req);
      res.status(200).json("Updated successfully !");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE DEVICE
  deleteDevice: async (req, res) => {
    try {
      await deviceService.findByIdAndDeleteit(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = deviceController;