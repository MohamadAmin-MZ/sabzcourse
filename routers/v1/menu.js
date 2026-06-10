const express = require("express")
const menuController = require("../../controllers/v1/menu")
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router()

router.get("/", menuController.getAll)
router.post("/", authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, menuController.create)
router.delete("/:id", authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, menuController.remove)
router.patch("/:id", authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, menuController.update)

module.exports = router