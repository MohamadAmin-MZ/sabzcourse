const express = require("express");
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const categoriesController = require("../../controllers/v1/category");

const router = express.Router()

router.post(
    "/create",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    categoriesController.create
)

router.delete(
    "/remove/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    categoriesController.remove
)

router.get(
    "/getAll",
    authMiddlewares.havingToken,
    categoriesController.getAll
)

router.put(
    "/updata/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    categoriesController.updata
)

module.exports = router;
