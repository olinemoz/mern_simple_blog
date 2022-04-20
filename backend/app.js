const express = require('express')
const app = express()
require('dotenv').config()
require('./config/dbConnect')
const routes = require('./routes/index')
const PORT = process.env.PORT || 5000


//Middlewares
app.use([express.json()])

//Route Integration
app.use(routes)

app.listen(PORT, () => {
    console.log("Server listening on port",PORT)
})