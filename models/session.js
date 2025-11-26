const mongoose = require("mongoose")

const sessionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    free: {
        type: Number, // 0 => not free & 1 => free
        required: true
    },
    video:{
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        required: true
    }

},
    { timestamps: true }
)

const sessionModel = mongoose.model("Sessions", sessionSchema)

module.exports = sessionModel