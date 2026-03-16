const express = require("express")
const orderController = require("./../../controllers/v1/order")
const authMiddlewares = require("../../middlewares/auth")
const router = express.Router() 

router.get("/", authMiddlewares.havingToken, orderController.getAll)
router.post("/:id", authMiddlewares.havingToken, orderController.getOne)


module.exports = router