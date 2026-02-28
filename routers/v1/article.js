const express = require("express")
const articleController = require("../../controllers/v1/article")
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")

const router = express.Router

router.get("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.getAll)
router.post("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.create)
router.delete("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.remove)
router.get("/getOne", articleController.getOne)
router.get("/draft", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, articleController.draft)




module.exports = router