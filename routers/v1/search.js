const searchController = require("../../controllers/v1/search")
const express = require("express")
const router = express.Router()


router.get("/:key", searchController.get)

module.exports = router
