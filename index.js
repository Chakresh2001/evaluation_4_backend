const express = require('express');
const connectToServer = require('./config/db');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
require('dotenv').config();
var cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())


app.get("/", (req,res)=>{
    res.send("Welcome to evaluation backend")
})

app.use("/users", userRoute)

app.use("/posts", postRoute)


app.listen(process.env.LOCAL_SERVER_PORT, connectToServer())