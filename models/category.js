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

const categoriesModel = mongoose.model("Categories", categoriesSchema)

module.exports = categoriesModel