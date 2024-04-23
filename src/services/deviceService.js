const deviceRepo = require("../repositories/deviceRepo");
const deviceService = 
{
    // ADD A DEVICE
    addnewdevice(req) {
        return deviceRepo.addadevice(req) ;
    },

    //GET A DEVICE
    finditbyID(id) {
        return deviceRepo.finditbyIDrepo(id); // find a device
    },
    //GET ALL DEVICES
    getalldevicess(id){
        return deviceRepo.getalldevicesrepo(id);
    },
    getdatasensorService(idsensor,iddevice,data) {
        return deviceRepo.getdatasensorRepo(idsensor,iddevice,data); 
    },
    //TURN ON OR OFF DEVICE
    // Updatingdevice(id){
    //     return deviceRepo.Updatingdevicerepo(id);  
    // },
    //FEED AUTO TEST
    updeviService(id){
        return deviceRepo.updeviRepo(id);  
    },
    //CHANGE DEVICE STATUS BY IOT gateway <from device>
    changedevicestatus(req){
        return deviceRepo.changestatus(req);  
    },

    changedeviceauto(req){
        return deviceRepo.changeautomode(req);  
    },
    //DELETE DEVICE
    findByIdAndDeleteit(id){
        deviceRepo.findByIdAndDeleteitrepo(id);
    }
}
  module.exports = deviceService;