const express = require("express")
const commentController = require("./../../controllers/v1/comment")
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")


const router = express.Router()

router.post("/addComment", authMiddlewares.havingToken, commentController.createComment)
router.delete("/:id", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, commentController.remove);
router.put("/:id/accept", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, commentController.accept)
router.put("/:id/reject", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, commentController.reject)
router.post("/:id/answer", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, commentController.answer)
router.get("/getAll", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, commentController.getAll)

module.exports = router