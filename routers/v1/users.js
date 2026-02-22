const express = require("express");
const userController = require("../../controllers/v1/user");
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")

const router = express.Router();

router.delete(
    "/deleteUser/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    userController.deletUser
)

router.get(
    "/getAll",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    userController.getAll
)

router.post(
    "/ban/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    userController.banUser
)

router.put(
    "/role",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    userController.changeRole
)

router.put(
    "/editUser",
    authMiddlewares.havingToken,
    userController.editUser
)



module.exports = router;
