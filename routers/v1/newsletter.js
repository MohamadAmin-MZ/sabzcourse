const express = require("express")
const newsLettercontroller = require("./../../controllers/v1/newsLetter")
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router()

router.get(
    "/",
    authMiddleware.havingToken,
    isAdminMiddleware.adminAuthentication,
    newsLettercontroller.getAll
)

router.post(
    "/",
    newsLettercontroller.creat
)

module.exports = router