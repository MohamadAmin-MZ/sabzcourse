const express = require("express")
const menuController = require("../../controllers/v1/menu")
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router()

router.get("/", menuController.getAll)
router.post("/create", authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, menuController.create)
router.delete("/:id/remove", authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, menuController.remove)
router.post("/:id/update", authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, menuController.update)
router.post("/getAll", authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, menuController.getAllInPanel)

module.exports = router