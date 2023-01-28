//=====================Importing Module and Packages=====================//
const express = require('express');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
require("dotenv").config();
const cors = require('cors')

app.use(cors())
app.use(express.json());

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("MongoDb is Connected."))
    .catch(error => console.log(error))


//===================== Global Middleware for All Route =====================//
app.use('/', route)


app.listen(process.env.PORT || 3001, function () {
    console.log('Express App Running on Port: ' + (process.env.PORT || 3001))
});