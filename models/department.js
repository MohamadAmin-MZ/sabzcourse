const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const model = mongoose.model("Department", schema);

module.exports = model;
