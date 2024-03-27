const authService = require('../services/authService')
const authController = {
  //Login
  loginUser: async (req, res) => {
    const { username, password } = req.body
    try {
      const verify = await authService.verifyUser(username, password)
      res.status(200).json(verify)
    } catch (err) {
      res.sendStatus(401)
    }
  },
}

module.exports = authController
