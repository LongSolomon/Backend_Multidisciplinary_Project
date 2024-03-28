const { Device } = require('./model')
const axios = require('axios');
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
// await device.updateOne({ set: {
    //    status: newStatus 
    // } })
  //UPDATE DEVICE 
  Updatingdevicerepo: async (req) => {
    const device = await Device.findById(req.params.id)
    const newStatus = !device.status;
    const username = 'kienle123';
    const feedKey = 'bbc-led';
    if (newStatus) { data = '1'}
    else {data = '0'}
    const apiUrl = `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data`;
    const dataToSend = {
        value: data, 
        created_at: new Date().toISOString() 
    };
    try {
        await axios.post(apiUrl, dataToSend, {
            headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_LHkD56hcMoTAEADz0n15B7fTaTDz'
            }
        });
        console.log('Data sent to Adafruit feed successfully.');
    } catch (error) {
        console.error('Error sending data to Adafruit feed:', error);
    }
    return
  },
  //CHANGE STATUS
  changestatus: async (req) => {
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
