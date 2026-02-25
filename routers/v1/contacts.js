const express = require("express");
const contactsController = require("./../../controllers/v1/contact");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router();

router.route("/").get(authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, contactsController.getAll)

router.route("/").post(contactsController.create);

router.route("/answer").post(authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, contactsController.answer);

router.route("/:id").delete(authMiddleware.havingToken, isAdminMiddleware.adminAuthentication, contactsController.remove);

module.exports = router;
