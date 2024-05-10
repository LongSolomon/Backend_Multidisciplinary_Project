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

  getAllDevices: async (req, res) => {
    try {
      const alldevices = await deviceService.getalldevicess(req.params.id);
      res.status(200).json(alldevices);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getNotice: async (req, res) => {
    try {
      const allNotices = await deviceService.getNoticeService(req.params.id);
      res.status(200).json(allNotices);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updevi: async (req, res) => {
    try {
      const device = await deviceService.updeviService(req.params.id, req.params.fanmode); //upvicestatus
      res.status(200).json("Updated successfully !");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  automodeDevice: async (req, res) => {
    try {
      const device = await deviceService.changedeviceauto(req);
      res.status(200).json("Updated successfully !");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //getdata
  getdatasensor: async (req, res) => {
    try {
      const device = await deviceService.getdatasensorService(req.params.idsensor, req.params.iddevice, req.params.data);
      res.status(200).json("send successfully !");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getdatasensorpost: async (req, res) => {
    try {
      const device = await deviceService.getdatasensorService(req.params.idsensor, req.params.iddevice, req.body.value);
      res.status(200).json("send successfully !");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getchangedevicepost: async (req, res) => {
    try {
      const device = await deviceService.getchangedevicepostService(req.params.iddevice, req.body.value);
      res.status(200).json("send successfully !");
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