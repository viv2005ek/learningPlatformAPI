const express = require("express");
const app = express()
app.use(express.json())

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/learningPlatform")
    .then(() => { console.log("connection is sucessful to DB"); })
    .catch((err) => { console.log("couldn't connect to mongoDb", err); })

const categories = require("./Routes/categories")
const students = require("./Routes/students")


app.use(categories)
app.use('/api/students', students) //default route ->/api/categories


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is running on host ${port}`))