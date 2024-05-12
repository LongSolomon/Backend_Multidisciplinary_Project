// import {createJWT,verifyToken} from './middlewares/jwtaction.js'
const express = require('express')
const cors = require('cors')
const LinksAllowed = require('./configs/LinksAllowed')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const authRoute = require('./routes/authRoute')
const deviceRoute = require('./routes/deviceRoute')
const activityLogRoute = require('./routes/activityLogRoute')
const createJWT = require('./middlewares/jwtaction').createJWT
const verifyToken = require('./middlewares/jwtaction').verifyToken
const checkUserJWT = require('./middlewares/jwtaction').checkUserJWT
const cookieParser = require('cookie-parser')

dotenv.config() // do for .env file
//CONNECT DATABASE
mongoose
  .connect(process.env.MONGODB_URL) // use .env file
  .then((success) => console.log('Connect Successfully to MongoDBz'))
  .catch((err) => console.log(err.message))

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  cors({
    credentials: true,
    origin: LinksAllowed,
  })
) // deter from cross origin restriction error
app.use(morgan('common')) // khi send API request -> inform in terminal
app.use(cookieParser())
// createJWT();
// let decoded = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNzE1NDM1NzY5fQ.dF_h0BWLWArGtXx38Az0s7Y4EEBIrDOKNFjCUT3Oom0')
// console.log(decoded);
//ROUTE
// app.use((req,res,next) => {
//   res.send('Welcome to the server');
//   next();
// })
app.get("/", (req, res) => {
  // res.cookie("a", "b",{httpOnly:true})
  res.send("Welcome")

})
app.use('/auth', authRoute)
app.use('/device', checkUserJWT, deviceRoute)
app.use('/log', activityLogRoute)

app.listen(4500, () => {
  console.log('server is running ...')
  console.log('http://localhost:4500')
})
