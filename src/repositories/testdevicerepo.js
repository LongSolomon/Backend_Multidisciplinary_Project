const { Device, LogHistory, Notice } = require('./model')
const axios = require('axios');
class DeviceVisitor {
    static async visit(entity, device, deviceclass, data) {
        return await deviceclass.accept(entity, device, data)
    }
}
class AdafruitPrecessorVisitor extends DeviceVisitor {
    static async visitLed(device, newStatus, deviceclass) {
        let data; if (newStatus) { data = '1' } else { data = '0' }
        return await deviceclass.sendingAdafruit(deviceclass.feedkey, data)
    }
    static async visitFan(device, modedim, deviceclass) {
        let data; if (modedim == '1') { data = '100' }
        else if (modedim == '2') { data = '70' }
        else if (modedim == '3') { data = '40' }
        else if (modedim == '0') { data = '0' }
        return await deviceclass.sendingAdafruit(deviceclass.feedkey, data)
    }
    static async visitBuzzer(device,newStatus, deviceclass) {
        await AdafruitPrecessorVisitor.visit(AdafruitPrecessorVisitor,device, Led, newStatus)//await AdafruitPrecessorVisitor.visitLed(newStatus, deviceclass)
    }
}
class dataSensorPrecessorVisitor extends DeviceVisitor {
    static async visitLed(device, data, deviceclass) {
        if (data < 30) { if ((device.automode) && (!device.status)) { await deviceRepo.updeviRepo(String(device._id), 'led'); } }
    }
    static async visitFan(device, data, deviceclass) {
        if (data >= 29.5) { //console.log("hello")
            if (data > 33) {
                let nowtime = new Date(); let check = new Date(device.time)
                if ((nowtime.getTime() - check.getTime()) > (1 * 60 * 1000)) {
                    let description = ((!device.automode) && (device.mode != '1')) ? `The temperature is really hot now at ${data} celcius degree !! We suggest that you should turn the fan on at the fastest speed with button 1` : `The temperature is now really high at ${data} celcius degree !!`
                    await deviceclass.createAbnormalNotice(device, description)
                    await device.updateOne({ $set: { time: nowtime.toISOString() } })
                }
            }//console.log("hello")
            if ((device.automode) && (device.mode != '1')) { await deviceRepo.updeviRepo(String(device._id), 'mot'); }
        }
        else if ((28.5 <= data) && (data < 29.5)) { if ((device.automode) && (device.mode != '2')) { await deviceRepo.updeviRepo(String(device._id), 'hai'); } }
        else if ((27.5 <= data) && (data < 28.5)) { if ((device.automode) && (device.mode != '3')) { await deviceRepo.updeviRepo(String(device._id), 'ba'); } }
        else if (data < 27.5) {
            if (data < 20) {
                let nowtime = new Date(); let check = new Date(device.time)
                if ((nowtime.getTime() - check.getTime()) > (1 * 60 * 1000)) {
                    let description = ((!device.automode) && (device.mode != '0')) ? `The temperature is really cold now at ${data} celcius degree !! We suggest that you should turn the fan off with button 0` : `The temperature is now really cold at ${data} celcius degree !!`
                    await deviceclass.createAbnormalNotice(device, description)
                    await device.updateOne({ $set: { time: nowtime.toISOString() } })
                }
            }
            if ((device.automode) && (device.mode != '0')) { await deviceRepo.updeviRepo(String(device._id), 'khong'); }
        }
    }
    static async visitBuzzer(device, data, deviceclass) {
        if (data == 1) {
            nowtime = new Date(); check = new Date(device.time)
            if ((nowtime.getTime() - check.getTime()) > (1 * 60 * 1000)) {
                description = `Warning !!! the system finds out that there is an abnormal entity in your house, please check the camera nearby ! Or if you do not have any camera, we suggest you go home with police assistence and buy some cameras at our company to protect yourself !!`
                await deviceclass.createAbnormalNotice(device, description)
                await device.updateOne({ $set: { time: nowtime.toISOString() } })
            }
            if (!device.status) { await deviceRepo.updeviRepo(String(device._id), 'buzzer'); }
        }
        else if (data == 0) {
            if (device.status) { await deviceRepo.updeviRepo(String(device._id), 'buzzer'); }
        }
    }
}
class Devices {
    static async ChangeAutomode(device) {
        const newmode = !device.automode;
        await device.updateOne({ $set: { automode: newmode } })
    }
    static async createlog(device, newStatus, modedim) {
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
    }
    static async createAbnormalNotice(device, description) {
        try {
            const notice = new Notice({
                device_id: device._id,
                device_name: device.deviceName,
                user: device.ownerID,
                notice_description: description,
                time: new Date().toISOString()
            });
            await notice.save();
            console.log('Add notice successfully.');
        } catch (error) {
            console.error('Error notice adding:', error);
        }
    }
    static async update3StaAutoMode(device, newStatus, modedim, automatic) {
        await device.updateOne({
            $set: {
                status: newStatus,
                mode: modedim,
                automode: automatic
            } })
    }
    static async sendingAdafruit(feedkey, data) {
        let apiUrl = `https://io.adafruit.com/api/v2/amopdz/feeds/${feedkey}/data`
        let dataToSend = { value: data, };
        try {
            await axios.post(apiUrl, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-AIO-Key': process.env.IO_KEY_ACCOUNT
                }
            });
            console.log('Data sent to Adafruit feed ', feedkey, ' successfully.');
        } catch (error) {
            console.error('Error sending data to Adafruit feed:', error);
        }
    }
}
class Led extends Devices {
    static feedkey = 'led'
    static async accept(entity, device, data) {
        return await entity.visitLed(device, data, Led)
    }
}
class Fan extends Devices {
    static feedkey = 'fan'
    static async accept(entity, device, data) {
        return await entity.visitFan(device, data, Fan)
    }
}
class Buzzer extends Devices {
    // feedkey = 'buzzer'
    static async accept(entity, device, data) {
        return await entity.visitBuzzer(device, data, Buzzer)
    }
}
const deviceRepo = {
    addadevice: async (req) => {
        const newDevice = new Device(req.body);
        return await newDevice.save();
    },
    finditbyIDrepo: async (id) => {
        return await Device.findById(id)
    },
    getalldevicesrepo: async (id) => {
        return await Device.find({ ownerID: id, })
    },
    getNoticeRepo: async (id) => {
        return await Notice.find({ user: id, })
    },
    changeautomode: async (req) => {
        const device = await Device.findById(req.params.id);
        return await Devices.ChangeAutomode(device)
    },
    updeviRepo: async (id, modedim) => {
        const device = await Device.findById(id);
        newStatus = !device.status;
        automatic = device.automode;
        if ((device.type == 1) && (device.status) && (modedim != '0')) { newStatus = device.status }
        if ((modedim == '1') || (modedim == '2') || (modedim == '3') || (modedim == '0') || (modedim == '5')) { automatic = false }
        if (modedim == 'mot') { modedim = '1' }
        else if (modedim == 'hai') { modedim = '2' }
        else if (modedim == 'ba') { modedim = '3' }
        else if (modedim == 'khong') { modedim = '0' }
        if ((newStatus != device.status) || (modedim != device.mode)) {
            await Devices.update3StaAutoMode(device, newStatus, modedim, automatic)
            await Devices.createlog(device, newStatus, modedim)
            if (device.type == 0) { return Led.accept(AdafruitPrecessorVisitor, device, newStatus) }
            else if (device.type == 1) { return Fan.accept(AdafruitPrecessorVisitor, device, modedim) }
            //*else if (device.type == 2) { return Buzzer.accept(AdafruitPrecessorVisitor, newStatus) }*/
        }
        return
    },
    getdatasensorRepo: async (idsensor, iddevice, data) => {
        const device = await Device.findById(iddevice) // find a device
        await device.updateOne({ $set: { latestdata: Number(data) } })
        if (device.type == 1) { return Fan.accept(dataSensorPrecessorVisitor, device, Number(data)) }
        else if (device.type == 0) { return Led.accept(dataSensorPrecessorVisitor, device, Number(data)) }
        else if (device.type == 2) { return Buzzer.accept(dataSensorPrecessorVisitor, device, Number(data)) }
    },
    //DELETE DEVICE
    findByIdAndDeleteitrepo: async (id) => { await Device.findByIdAndDelete(id); return },
}
module.exports = deviceRepo
