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

dotenv.config() // do for .env file
//CONNECT DATABASE
mongoose
  .connect(process.env.MONGODB_URL) // use .env file
  .then((success) => console.log('Connect Successfully to MongoDB'))
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

//ROUTE
app.get("/", (req, res) => {

  res.send("Welcome")
  
} )
app.use('/auth', authRoute)
app.use('/device', deviceRoute)

app.listen(4500, () => {
  console.log('server is running ...')
})
