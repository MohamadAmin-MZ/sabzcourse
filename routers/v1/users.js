const express = require("express");
const userController = require("../../controllers/v1/user");
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")

const router = express.Router();


router.get(
    "/",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    userController.getAll
)

router.patch(
    "/:id/role",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    userController.changeRole
)

router.patch(
    "/",
    authMiddlewares.havingToken,
    userController.editUser
)

router.delete(
    "/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    userController.deletUser
)

router.post(
    "/:id/ban",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    userController.banUser
)



module.exports = router;
