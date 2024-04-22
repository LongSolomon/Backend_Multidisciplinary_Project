const { LogHistory } = require('./model')
// const dotenv = require('dotenv')
// dotenv.config()
const axios = require('axios');
const logRepo = {
//   // ADD 1 log
//   addalog: async (req) => {
//     const newlog = new log(req.body);
//     const savedlog = await newlog.save();
//     return savedlog
//   },

  //GET A log
  findLogByIDrepo: async (id) => {
    const alllogs = await LogHistory.find({
        device_id: id,
    })
    return alllogs
  },

  getAllLogsFromUserrepo: async (id) => {
    const alllogs = await LogHistory.find({
      user: id,
    }) // find a log
    return alllogs
  },

  getAllLogsrepo: async () => {
    // console.log('get all logs')
    const alllogs = await LogHistory.find({}) // find all log
    return alllogs
  },

  // await log.updateOne({ set: {
  //    status: newStatus 
  // } })
  //UPDATE log 
//   Updatinglogrepo: async (id) => {
//     const log = await log.findById(id);
//     const newStatus = !log.status;
//     await log.updateOne({
//       $set: {
//         status: newStatus
//       }
//     })
//     const username = 'amopdz';
//     if (log.type == 0) {
//       feedKey = 'led';
//       if (newStatus) { data = '1' }
//       else { data = '0' }
//       apiUrl = `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data`;
//       dataToSend = {
//         value: data,
//         created_at: new Date().toISOString()
//       };
//       try {
//         await axios.post(apiUrl, dataToSend, {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-AIO-Key': process.env.IO_KEY_ACCOUNT
//           }
//         });
//         console.log('Data sent to Adafruit feed led successfully.');
//       } catch (error) {
//         console.error('Error sending data to Adafruit feed:', error);
//       }
//     }
//     else if (log.type == 1) {
//       feedKey = 'fan';
//       if (newStatus) { data = '80' }
//       else { data = '0' }
//       apiUrl = `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data`;
//       dataToSend = {
//         value: data,
//         created_at: new Date().toISOString()
//       };
//       try {
//         await axios.post(apiUrl, dataToSend, {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-AIO-Key': process.env.IO_KEY_ACCOUNT
//           }
//         });
//         console.log('Data sent to Adafruit feed fan successfully.');
//       } catch (error) {
//         console.error('Error sending data to Adafruit feed:', error);
//       }
//     }

//     return
//   },
//   //CHANGE STATUS
//   changestatus: async (req) => {
//     const log = await log.findById(req.params.id);
//     const newStatus = !log.status;
//     await log.updateOne({
//       $set: {
//         status: newStatus
//       }
//     })
//     return
//   },

//   changeautomode: async (req) => {
//     const log = await log.findById(req.params.id);
//     const newmode = !log.automode;
//     await log.updateOne({
//       $set: {
//         automode: newmode
//       }
//     })
//     return
//   },

//   Upcerepo: async (req) => {
//     const log = await log.findById(req.params.id);
//     const newStatus = !log.status;
//     await log.updateOne({
//       $set: {
//         status: newStatus
//       }
//     })
//       try{
//         const log = new LogHistory({ 
//         log_id: log._id ,
//         log_name: log.logName,
//         user: log.ownerID,
//         activity_description: `log ${log.logName} is turned ${newStatus ? 'on' : 'off'}`,
//         time: new Date().toISOString()
//       });
//       await log.save();
//       console.log('Activity logged successfully.');
//     } catch (error) {
//       console.error('Error logging activity:', error);
//     }
  
//     const username = 'amopdz';
//     if (log.type == 0) {
//       feedKey = 'led';
//       if (newStatus) { data = '1' }
//       else { data = '0' }
//       apiUrl = `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data`;
//       dataToSend = {
//         value: data,
//         created_at: new Date().toISOString()
//       };
//       try {
//         await axios.post(apiUrl, dataToSend, {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-AIO-Key': process.env.IO_KEY_ACCOUNT
//           }
//         });
//         console.log('Data sent to Adafruit feed led successfully.');
//       } catch (error) {
//         console.error('Error sending data to Adafruit feed:', error);
//       }
      
//     }
//     else if (log.type == 1) {
//       feedKey = 'fan';
//       if (newStatus) { data = '80' }
//       else { data = '0' }
//       apiUrl = `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data`;
//       dataToSend = {
//         value: data,
//         created_at: new Date().toISOString()
//       };
//       try {
//         await axios.post(apiUrl, dataToSend, {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-AIO-Key': process.env.IO_KEY_ACCOUNT
//           }
//         });
//         console.log('Data sent to Adafruit feed fan successfully.');
//       } catch (error) {
//         console.error('Error sending data to Adafruit feed:', error);
//       }
//     }
//     return
//   },

//   checkdataforlogrepo: async (idsensor, idlog, data) => {
//     const log = await log.findById(idlog) // find a log
//     if (log.type == 1) {
//       if (Number(data) > 29) // maybe 29 right ? 
//       {
//         if ((log.automode) && (!log.status)) {
//           await logRepo.Updatinglogrepo(idlog);
//         }
//       }
//       else if (Number(data) < 27.5) {
//         if ((log.automode) && (log.status)) {
//           await logRepo.Updatinglogrepo(idlog);
//         }
//       }
//     }
//     return
//   },
//   //DELETE log
//   findByIdAndDeleteitrepo: async (id) => {
//     await log.findByIdAndDelete(id)
//     return
//   },
}
module.exports = logRepo
