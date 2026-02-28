const mongoose = require("mongoose")

const articlesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.type.ObjectId,
        ref: "Category"
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    cover: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    publish: {
        type: Number,
        required: true
    },
},
    { timestamps: true }
)

const articlesModel = mongoose.model("Crticles", articlesSchema)

module.exports = articlesModel