const express = require("express");
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const categoriesController = require("../../controllers/v1/category");

const router = express.Router()

router.post(
    "/",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    categoriesController.create
)

router.get(
    "/",
    authMiddlewares.havingToken,
    categoriesController.getAll
)

router.patch(
    "/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    categoriesController.updata
)

router.delete(
    "/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    categoriesController.remove
)

module.exports = router;
