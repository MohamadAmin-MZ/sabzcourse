const express = require("express")
const courseController = require("../../controllers/v1/course")
const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const multer = require("multer")
const multerStorage = require("./../../utils/uploader")
const router = express.Router()

router.post(
    "/create",
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single("cover"),
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.addCourse
)

router.post("/:id/createSession",
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single("video"),
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.createSession
)

router.get("/sessions",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.getAllSessions
)

router.get("/category/:href",
    authMiddlewares.havingToken,
    courseController.getCoursesByCategory
);

router.get("/:href/:sessionId",
    courseController.getSession
)

router.delete("/session/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.removeSession
)

router.post("/:id/register",
    authMiddlewares.havingToken,
    courseController.register
)

router.get("/presell",
    courseController.presell
);

// router.get("/:href", authMiddlewares.havingToken,
//     courseController.getOne
// )

router.delete("/:id",
    authMiddlewares.havingToken,
    isAdminMiddlewares.adminAuthentication,
    courseController.remove
)

router.get("/related/:href",
    courseController.getRelated
);

router.get("/popular",
    courseController.popular
);


module.exports = router