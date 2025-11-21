const express = require("express")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser")
const authRouter = require("./routers/v1/auth")

const app = express()

app.use("courses/covers", express.static(path.join(__dirname, "courses", "covers")))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/v1/auth" , authRouter)

module.exports = app;