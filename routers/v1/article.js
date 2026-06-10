const express = require("express")
const articleController = require("../../controllers/v1/article")
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const multer = require("multer")
const multerStorge = require("../../utils/uploader")

const router = express.Router()

router.post("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.create) // draft and published
router.get("/", articleController.getAll)
router.delete("/:id", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.remove)
router.get("/:id", articleController.getOne)


module.exports = router