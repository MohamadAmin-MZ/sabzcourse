const mongoose = require("mongoose")

const categoriesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    }
})

const categoriesModel = mongoose.model("Category", categoriesSchema)

module.exports = categoriesModel