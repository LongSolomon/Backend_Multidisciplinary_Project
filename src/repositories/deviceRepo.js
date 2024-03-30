const { Device } = require('./model')
const axios = require('axios');
const deviceRepo = {
  // ADD 1 DEVICE
  addadevice: async (req) => {
    const newDevice = new Device(req.body);
    const savedDevice = await newDevice.save();
    return savedDevice
  },

  //GET A DEVICE
  finditbyIDrepo: async (id) => {
    const device = await Device.findById(id) // find a device
    return device
  },

  getalldevicesrepo: async (id) => {
    const alldevices = await Device.find({
      ownerID: id,
    }) // find a device
    return alldevices
  },

// await device.updateOne({ set: {
    //    status: newStatus 
    // } })
  //UPDATE DEVICE 
  Updatingdevicerepo: async (id) => {
    const device = await Device.findById(id);
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
    const device = await Device.findById(req.params.id);
    const newStatus = !device.status;
    await device.updateOne({ $set: {
       status: newStatus 
    } })
    return
  },
  
  changeautomode: async (req) => {
    const device = await Device.findById(req.params.id);
    const newmode = !device.automode;
    await device.updateOne({ $set: {
      automode: newmode 
    } })
    return
  },

  Upcerepo: async (req) => {
    const device = await Device.findById(req.params.id);
    const newStatus = !device.status;
    await device.updateOne({ $set: {
       status: newStatus 
    } })
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

  checkdatafordevicerepo: async (idsensor,iddevice,data) => {
    const device = await Device.findById(iddevice) // find a device
    if (device.type == 1) {
      if (Number(data)>29) // maybe 29 right ? 
    {
      if ((device.automode)&&(!device.status)) {
        await deviceRepo.Updatingdevicerepo(iddevice);
      }
    }
    else if (Number(data)<23){
      if ((device.automode)&&(device.status)) {
        await deviceRepo.Updatingdevicerepo(iddevice);
      }
    }
    }
    return
  },
  //DELETE DEVICE
  findByIdAndDeleteitrepo: async (id) => {
    await Device.findByIdAndDelete(id)
    return
  },
}
module.exports = deviceRepo
