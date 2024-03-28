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
  
    //TURN ON OR OFF DEVICE
    Updatingdevice(req){
        return deviceRepo.Updatingdevicerepo(req);  
    },
    
    //CHANGE DEVICE STATUS BY IOT gateway <from device>
    changedevicestatus(req){
        return deviceRepo.changestatus(req);  
    },

    //DELETE DEVICE
    findByIdAndDeleteit(id){
        deviceRepo.findByIdAndDeleteitrepo(id);
    }
}
  module.exports = deviceService;