const express = require("express")
const router = express.Router()
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const offController = require("../../controllers/v1/off")

router.get("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, offController.getAll)

router.post("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, offController.create)

router.delete("/:code", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, offController.remove)

router.post("/campaign", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, offController.setAll)

router.get("/:id", authMiddlewares.havingToken, offController.getOne)

module.exports = router