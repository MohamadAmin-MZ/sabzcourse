const express = require("express")
const articleController = require("../../controllers/v1/article")
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const multer = require("multer")
const multerStorge = require("../../utils/uploader")

const router = express.Router()

router.post("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.create)
router.get("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.getAll)
router.delete("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.remove)
router.get("/getOne", articleController.getOne)
router.post("/draft", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.draft)




module.exports = router