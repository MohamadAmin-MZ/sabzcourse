const authMiddlewares = require("../../middlewares/auth")
const isAdminMiddlewares = require("../../middlewares/isAdmin")
const ticketController = require("../../controllers/v1/ticket")
const exprees = require("express")

const router = exprees.Router()

router.get("/", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, ticketController.getAll)

router.post("/answer", authMiddlewares.havingToken, isAdminMiddlewares.adminAuthentication, ticketController.answer)

router.post("/", authMiddlewares.havingToken, ticketController.create)

router.get("/department", ticketController.departments)

router.get("/user", authMiddlewares.havingToken, ticketController.userTickets)

router.get("/:id/answer", authMiddlewares.havingToken, ticketController.getAnswer)

router.get("/department/:id/subs", ticketController.departmentSubs)

// router.post("/createDepartment", ticketController.createDepartment)

// router.post("/createDepartmentSub", ticketController.createDepartmentSub)



module.exports = router