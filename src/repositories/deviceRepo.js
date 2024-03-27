const { Device } = require('./model')
const deviceRepo = {
  // ADD 1 DEVICE
  addadevice: async (req) => {
    const newDevice = new Device(req.body)
    const savedDevice = await newDevice.save()
    return savedDevice
  },

  //GET A DEVICE
  finditbyIDrepo: async (id) => {
    const device = await Device.findById(id) // find a device
    return device
  },

  //UPDATE DEVICE
  Updatingdevicerepo: async (req) => {
    const device = await Device.findById(req.params.id)
    const newStatus = !device.status;
    await device.updateOne({ $set: {
       status: newStatus 
    } })
    return
  },

  //DELETE DEVICE
  findByIdAndDeleteitrepo: async (id) => {
    await Device.findByIdAndDelete(id)
    return
  },
}
module.exports = deviceRepo
