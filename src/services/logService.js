const logRepo = require("../repositories/logRepo");
const logService = 
{
    // // ADD A log
    // addnewlog(req) {
    //     return logRepo.addalog(req) ;
    // },

    //GET A log
    findLogByID(id) {
        return logRepo.findLogByIDrepo(id); // find a log
    },
    
    getAllLogsFromUser(id){
        return logRepo.getAllLogsFromUserrepo(id);
    },

    //GET ALL logS
    getAllLogs(){
        return logRepo.getAllLogsrepo();
    },

    


    // checkdataforlog(idsensor,idlog,data) {
    //     return logRepo.checkdataforlogrepo(idsensor,idlog,data); 
    // },
    // //TURN ON OR OFF log
    // Updatinglog(id){
    //     return logRepo.Updatinglogrepo(id);  
    // },
    // //FEED AUTO TEST
    // upvicestatus(id){
    //     return logRepo.Upcerepo(id);  
    // },
    // //CHANGE log STATUS BY IOT gateway <from log>
    // changelogstatus(req){
    //     return logRepo.changestatus(req);  
    // },

    // changelogauto(req){
    //     return logRepo.changeautomode(req);  
    // },
    // //DELETE log
    // findByIdAndDeleteit(id){
    //     logRepo.findByIdAndDeleteitrepo(id);
    // }
}
  module.exports = logService;