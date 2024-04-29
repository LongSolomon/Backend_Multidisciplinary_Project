const { Device, LogHistory, Notice } = require('./model')
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
  getNoticeRepo: async (id) => {
    const allNotices = await Notice.find({
      user: id,
    })
    return allNotices
  },
  //CHANGE STATUS

  changeautomode: async (req) => {
    const device = await Device.findById(req.params.id);
    const newmode = !device.automode;
    await device.updateOne({
      $set: {
        automode: newmode
      }
    })
    return
  },

  updeviRepo: async (id, modedim) => {
    const device = await Device.findById(id);
    newStatus = !device.status;
    automatic = device.automode;
    if ((device.type == 1) && (device.status) && (modedim != '0')) {
      newStatus = device.status
    }
    //a = modedim
    if ((modedim == '1') || (modedim == '2') || (modedim == '3') || (modedim == '0')) {
      automatic = false
    }
    if (modedim == 'mot') { modedim = '1' }
    else if (modedim == 'hai') { modedim = '2' }
    else if (modedim == 'ba') { modedim = '3' }
    else if (modedim == 'khong') { modedim = '0' }
    if ((newStatus != device.status) || (modedim != device.mode)) {
      await device.updateOne({
        $set: {
          status: newStatus,
          mode: modedim,
          automode: automatic
        }
      })
      try {
        const log = new LogHistory({
          device_id: device._id,
          device_name: device.deviceName,
          user: device.ownerID,
          activity_description: `Device ${device.deviceName} is turned ${newStatus ? 'on' : 'off'} ${((device.type == 1) && (modedim != '0')) ? `with button ${modedim}` : ''}`,
          time: new Date().toISOString()
        });
        await log.save();
        console.log('Activity logged successfully.');
      } catch (error) {
        console.error('Error logging activity:', error);
      }

      const username = 'amopdz';
      if (device.type == 0) {
        feedKey = 'led';
        if (newStatus) { data = '1' }
        else { data = '0' }
        apiUrl = `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data`;
        dataToSend = {
          value: data,
          //created_at: new Date().toISOString()
        };
        try {
          await axios.post(apiUrl, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
              'X-AIO-Key': process.env.IO_KEY_ACCOUNT
            }
          });
          console.log('Data sent to Adafruit feed led successfully.');
        } catch (error) {
          console.error('Error sending data to Adafruit feed:', error);
        }

      }
      else if (device.type == 1) {
        feedKey = 'fan';
        if (modedim == '1') { data = '100' }
        else if (modedim == '2') { data = '70' }
        else if (modedim == '3') { data = '40' }
        else if (modedim == '0') { data = '0' }
        apiUrl = `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data`;
        dataToSend = {
          value: data,
          //created_at: new Date().toISOString()
        };
        try {
          await axios.post(apiUrl, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
              'X-AIO-Key': process.env.IO_KEY_ACCOUNT
            }
          });
          console.log('Data sent to Adafruit feed fan successfully.');
        } catch (error) {
          console.error('Error sending data to Adafruit feed:', error);
        }
      }
    }
    return
  },

  getdatasensorRepo: async (idsensor, iddevice, data) => {
    const device = await Device.findById(iddevice) // find a device
    await device.updateOne({
      $set: {
        latestdata: Number(data)
      }
    })
    if (device.type == 1) { //temperature - fan control automatic mode

      if (Number(data) >= 29.5) {
        if (Number(data) > 33) {
          nowtime = new Date()
          check = new Date(device.time)
          if ((nowtime.getTime() - check.getTime()) > (1 * 60 * 1000)) {
            try {
              const notice = new Notice({
                device_id: device._id,
                device_name: device.deviceName,
                user: device.ownerID,
                notice_description: ((!device.automode) && (device.mode != '1')) ? `The temperature is really hot now at ${data} celcius degree !! We suggest that you should turn the fan on at the fastest speed with button 1` : `The temperature is now really high at ${data} celcius degree !!`,
                time: nowtime.toISOString()
              });
              await notice.save();
              console.log('Add notice successfully.');
            } catch (error) {
              console.error('Error notice adding:', error);
            }
            await device.updateOne({
              $set: {
                time: nowtime.toISOString()
              }
            })
          }
        }
        if ((device.automode) && (device.mode != '1')) {
          await deviceRepo.updeviRepo(iddevice, 'mot');
        }
      }
      else if ((28.5 <= Number(data)) && (Number(data) < 29.5)) {
        if ((device.automode) && (device.mode != '2')) {
          await deviceRepo.updeviRepo(iddevice, 'hai');
        }
      }
      else if ((27.5 <= Number(data)) && (Number(data) < 28.5)) {
        if ((device.automode) && (device.mode != '3')) {
          await deviceRepo.updeviRepo(iddevice, 'ba');
        }
      }
      else if (Number(data) < 27.5) {
        if (Number(data) < 20) {
          nowtime = new Date()
          check = new Date(device.time)
          if ((nowtime.getTime() - check.getTime()) > (1 * 60 * 1000)) {
            try {
              const notice = new Notice({
                device_id: device._id,
                device_name: device.deviceName,
                user: device.ownerID,
                notice_description: ((!device.automode) && (device.mode != '0')) ? `The temperature is really cold now at ${data} celcius degree !! We suggest that you should turn the fan off with button 0` : `The temperature is now really cold at ${data} celcius degree !!`,
                time: nowtime.toISOString()
              });
              await notice.save();
              console.log('Add notice successfully.');
            } catch (error) {
              console.error('Error notice adding:', error);
            }
            await device.updateOne({
              $set: {
                time: nowtime.toISOString()
              }
            })
          }
        }
        if ((device.automode) && (device.mode != '0')) {
          await deviceRepo.updeviRepo(iddevice, 'khong');
        }
      }
    }
    else if (device.type == 0) { // light - lamp
      if (Number(data) < 30) {
        if ((device.automode) && (!device.status)) {
          await deviceRepo.updeviRepo(iddevice, 'led');
        }
      }

    }
    else if (device.type == 2) { // infrared - buzzer
      if (Number(data) == 1) //
      {
        nowtime = new Date()
        // console.log(nowtime.getTime())
        check = new Date(device.time)
        // console.log(check.getTime())
        // console.log((nowtime.getTime() - check.getTime())/(60*1000)) 
        if ((nowtime.getTime() - check.getTime()) > (5 * 60 * 1000)) {

          try {
            const notice = new Notice({
              device_id: device._id,
              device_name: device.deviceName,
              user: device.ownerID,
              notice_description: `Warning !!! the system finds out that there is an abnormal entity in your house, please check the camera nearby ! Or if you do not have any camera, we suggest you go home with police assistence and buy some cameras at our company to protect yourself !!`,
              time: nowtime.toISOString()
            });
            await notice.save();
            console.log('Add notice successfully.');
          } catch (error) {
            console.error('Error notice adding:', error);
          }
          await device.updateOne({
            $set: {
              time: nowtime.toISOString()
            }
          })
        }
        if (!device.status) {
          await deviceRepo.updeviRepo(iddevice, 'buzzer');
        }
      }
      else if (Number(data) == 0) {
        if (device.status) {
          await deviceRepo.updeviRepo(iddevice, 'buzzer');
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
