const mongoose = require("mongoose")

const courseUserSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    }
}, { timestamps: true })

const courseUserModel = mongoose.model("CourseUser", courseUserSchema)

module.exports = courseUserModel