const deviceRepo = require("../repositories/deviceRepo");

const deviceService =
{
    addnewdevice(req) { return deviceRepo.addadevice(req); }, // ADD A DEVICE
    finditbyID(id) { return deviceRepo.finditbyIDrepo(id); }, //GET A DEVICE
    getalldevicess(id) { return deviceRepo.getalldevicesrepo(id); }, //GET ALL DEVICES
    getNoticeService(id) { return deviceRepo.getNoticeRepo(id); },
    getdatasensorService(idsensor, iddevice, data) {
        return deviceRepo.getdatasensorRepo(idsensor, iddevice, data);
    },
    getchangedevicepostService(iddevice, data) {
        return deviceRepo.getchangedevicepostRepo(iddevice, data);
    },
    updeviService(id, mode) { return deviceRepo.updeviRepo(id, mode); },
    changedeviceauto(req) { return deviceRepo.changeautomode(req); },
    findByIdAndDeleteit(id) { deviceRepo.findByIdAndDeleteitrepo(id); }
}
module.exports = deviceService;