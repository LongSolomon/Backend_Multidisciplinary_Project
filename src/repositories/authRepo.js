const bcrypt = require('bcrypt') // hash password
const { User } = require('./model')

const authRepo = {
  //Login
  findUserByUsername: async (username) => {
    const user = await User.findOne({ username }).exec()
    return user
  },
}

module.exports = authRepo
