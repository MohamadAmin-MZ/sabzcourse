const courseModel = require("../../models/course")

const get = async (req, res) => {
    const key = req.params.key
    const course = await courseModel.find({name: {$regex: ".*" + key + ".*" }})

    return res.status(200).json(course)
}

module.exports = {get}