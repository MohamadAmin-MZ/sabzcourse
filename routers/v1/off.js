const express = require("express")
const router = express.Router()
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const offController = require("../../controllers/v1/off")

router.get("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, offController.getAll)

router.post("/create", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, offController.create)

router.delete("/delete", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, offController.remove)

router.post("/:code", authMiddlewares.havingToken, offController.getOne)

router.post("/Campaign", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, offController.setAll)

module.exports = router