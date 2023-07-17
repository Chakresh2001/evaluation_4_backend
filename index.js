const express = require('express');
const connectToServer = require('./config/db');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
require('dotenv').config();

const app = express()

app.use(express.json())


app.use("/users", userRoute)

app.use("/posts", postRoute)


app.listen(process.env.LOCAL_SERVER_PORT, connectToServer())