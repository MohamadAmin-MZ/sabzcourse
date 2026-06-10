const express = require("express")
const courseController = require("../../controllers/v1/course")
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const multer = require("multer")
const multerStorage = require("./../../utils/uploader")
const router = express.Router()

router.post(
    "/",
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single("cover"),
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.addCourse
)

router.get("/sessions",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.getAllSessions
)

router.get(
    "/:courseId/comments",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.getCommentsByCourse
)

router.get("/presell",
    courseController.presell
);

// router.get("/",
//     courseController.getOne
// )

router.get("/popular",
    courseController.popular
);

router.post("/:id/sessions",
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single("video"),
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.createSession
)

router.get("/:href",
    courseController.getCoursesByCategory
);

router.get("/:href/sessionId",
    courseController.getSession
)

router.delete("/sessions/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.removeSession
)

router.post("/:id/registrations",
    authMiddlewares.havingToken,
    courseController.register
)

router.delete("/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.remove
)

router.get("/:href/related",
    courseController.getRelated
);


module.exports = router