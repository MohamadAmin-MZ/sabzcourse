const express = require("express");
const contactsController = require("./../../controllers/v1/contact");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router();

router.get(
    "/",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    contactsController.getAll
)

router.post(
    "/",
    contactsController.create
)

router.post(
    "/answer",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    contactsController.answer
)

router.delete(
    "/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    contactsController.remove
)

module.exports = router;
