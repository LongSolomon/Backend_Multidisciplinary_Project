const authRepo = require('../repositories/authRepo')
const createJWT = require('../middlewares/jwtaction').createJWT
const authService = {
  verifyUser: async (username, password) => {
    const user = await authRepo.findUserByUsername(username)
    if (!user) {
      throw new Error('Unauthenticated')
    }
    const verify = password === user.password
    if (verify) {
      payload = {
        username: user.username,
        role: "user",
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      }
      const token = createJWT(payload)
      res.cookie("jwt",token,{httpOnly:true})
      return user._id
    }
    throw new Error('Unauthenticated')
  },
}

module.exports = authService
