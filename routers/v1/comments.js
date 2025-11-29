const express = require("express")
const commentController = require("./../../controllers/v1/comment")
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")


const router = express.Router()

router.post("/addComment",authMiddlewares.havingToken ,commentController.createComment)


module.exports= router