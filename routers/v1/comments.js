const express = require("express")
const commentController = require("./../../controllers/v1/comment")
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")


const router = express.Router()

router.post(
    "/",
    authMiddlewares.havingToken,
    commentController.createComment
)

router.post(
    "/:id/answer",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    commentController.answer
)

router.delete(
    "/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    commentController.remove
)

router.patch(
    "/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    commentController.accept
)

module.exports = router