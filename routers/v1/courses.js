const express = require("express")
const courseController = require("../../controllers/v1/course")
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const multer = require("multer")
const multerStorage = require("./../../utils/uploader")
const router = express.Router()

router.post(
    "/create",
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single("cover"),
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.createCourse
)

router.post("/:id/session",
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single("video"),
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.createSessions
 )

module.exports = router