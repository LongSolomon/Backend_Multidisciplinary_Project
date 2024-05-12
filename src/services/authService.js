const authRepo = require('../repositories/authRepo')
const authService = {
  verifyUser: async (username, password) => {
    const user = await authRepo.findUserByUsername(username)
    if (!user) {
      throw new Error('Unauthenticated')
    }
    const verify = password === user.password
    if (verify) {
      return {
        user:user._id,
        token: "ha",
      }
    }
    throw new Error('Unauthenticated')
  },
}

module.exports = authService
