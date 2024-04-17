const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

  },
  { timestamps: true } // show when it is created and updated
)

const devicesSchema = new mongoose.Schema({
  deviceName: {  // ten thiet bi
    type: String,
    required: true,
  },
  deviceModel: {  // noi san xuan
    type: String,
    required: true,
  },
  description: {  // mo ta dac diem
    type: String,
    required: true,
  },
  status: { // on or off
    type: Boolean,
    required: true,
    default: true,
  },
  condition: { // work or not work
    type: Boolean,
    required: true,
    default: true,
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  automode: { // auto or not
    type: Boolean,
    required: true,
    default: false,
  },
  type: { // 0 is lamp, 1 is fan, 2 is buzzer, 3 is nonsense
    type: Number,
    required: true,
    default: 3,
  },
  latestdata: { //để check nhiệt độ, ánh sáng hiện tại
    type: Number,
    required: true,
    default: -1,
  }
})

const usingHistory = new mongoose.Schema({
  device_id:{
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'Device',
  },
  device_name:{
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
  },
  activity_description:{
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
})
let Device = mongoose.model('Device', devicesSchema)
let User = mongoose.model('User', userSchema)
let LogHistory = mongoose.model('LogHistory', usingHistory)
module.exports = { Device, User, LogHistory }
