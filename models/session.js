const mongoose = require("mongoose")

const sessionSchema = mongoose.Schema({
    title: {
        Type: String,
        required: true
    },
    time: {
        Type: String,
        required: true
    },
    free: {
        Type: Number, // 0 => not free & 1 => free
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        required: true
    }

},
    { timestamps: true }
)

const sessionModel = mongoose.model("sessions", sessionSchema)

module.exports = { sessionModel }