const offModel = require("../../models/off")
const courseModel = require("../../models/course")

const getAll = async (req, res) => {
    const offers = await offModel.find({}).populate("course", "name href").populate("creator", "name")
    return res.status(200).json(offers)
}

const create = async (req, res) => {
    const { code, percent, course, max } = req.body

    const ok = await offModel.create({ code, percent, course, max, uses: 0, creator: req.user._id })
    return res.status(201).json(ok)
}


const remove = async (req, res) => {
    const { code, courseId } = req.body

    if (!code && !courseId)
        return res.status(400).json({ message: "code or courseId is required" })

    const off = await offModel.findOneAndDelete(
        code ? { code: code } : { course: courseId }
    )

    if (!off)
        return res.status(404).json({ message: "Off not found" })

    return res.status(200).json({ message: "Removed successfully" })
}

const getOne = async (req, res) => {
    const { course, code } = req.body
    const off = await offModel.findOne({ code, course })
    if (!off) {
        return res.status(404).json({ massage: "code is not valid." })
    } else if (off.uses === off.max) {
        return res.status(409).json({ massage: "code id alrealy used." })
    } else {
        await offModel.updateMany({ code, course }, { uses: off.uses + 1 })
        return res.status(200).json(off)
    }
}

const setAll = async (req, res) => {
    const { discount } = req.body
    const coursDiscount = await courseModel.updateMany({}, { $set: { discount } })
    return res.json({ massage: "setAll successfully." })
}

module.exports = {
    getAll,
    create,
    remove,
    getOne,
    setAll
}

