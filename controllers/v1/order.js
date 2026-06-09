const courseUsersModel = require("./../../models/course-user")

const getAll = async (req, res) => {
    const userId = req.user._id
    const orders = await courseUsersModel.find({ user: userId }).populate("course", "name href")
    return res.status(200).json(orders)
}


const getOne = async (req, res) => {
    const orderId = req.params.id
    const order = await courseUsersModel.findOne({_id: orderId}).populate("course")
    return res.status(200).json(order)
}

module.exports = { getAll, getOne }