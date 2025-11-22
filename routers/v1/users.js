const express = require("express");
const userController = require("../../controllers/v1/user");
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")

const router = express.Router();

router.post("/ban/:id", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, userController.banUser);

module.exports = router;
