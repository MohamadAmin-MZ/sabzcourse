const express = require("express")
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser")
const authRouter = require("./routers/v1/auth")
const ususersRouter = require("./routers/v1/users")
const categoriesRouter = require("./routers/v1/categories")
const coursesRouter = require("./routers/v1/courses")
const commentRouter = require("./routers/v1/comments")
const contactRouter = require("./routers/v1/contacts")
const newsLetterRouter = require("./routers/v1/newsletter")

const app = express()

app.use("courses/covers", express.static(path.join(__dirname, "courses", "covers")))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/v1/auth", authRouter)
app.use("/v1/users", ususersRouter)
app.use("/v1/categories", categoriesRouter)
app.use("/v1/courses", coursesRouter)
app.use("/v1/comment", commentRouter)
app.use("/v1/contact", contactRouter)
app.use("/v1/newsLetter" , newsLetterRouter)
module.exports = app;