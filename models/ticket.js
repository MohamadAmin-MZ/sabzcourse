const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        departmendId: {
            type: mongoose.Types.ObjectId,
            ref: "Department",
            required: true
        },
        departmendSubId: {
            type: mongoose.Types.ObjectId,
            ref: "DepartmentSub",
            required: true
        },
        prioriby: {
            type: Number,
            required: true
        },
        parent: {
            type: mongoose.Types.ObjectId,
            ref: "Ticket",
            required: false
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        answer: {
            type: Number,
            required: true
        },
        isAnswer: {
            type: Number,
            required: true
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: "Course",
            required: false
        },

    },
    { timestamps: true }
);

const model = mongoose.model("Ticket", schema);

module.exports = model;
