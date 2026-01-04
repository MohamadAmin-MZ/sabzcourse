const mongoose = require("mongoose")

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })


const newsletterModel = mongoose.model("NewsLetter", newsletterSchema)

module.exports = newsletterModel