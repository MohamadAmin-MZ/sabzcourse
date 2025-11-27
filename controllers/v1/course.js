const courseModel = require("../../models/course")
const sessionModel = require("../../models/session")
const {isValidObjectId} = require("mongoose")

const addCourse = async (req, res) => {
    const {
        name,
        description,
        support,
        href,
        price,
        status,
        discount,
        categoryID,
    } = req.body

    const course = await courseModel.create({
        name,
        description,
        cover: req.file.filename,
        support,
        href,
        price,
        status,
        discount,
        categoryID,
        creator: req.user._id
    })

    const mainCourse = await courseModel
        .findById(course._id)
        .populate("creator", "-password");


    res.status(201).json(mainCourse)
}


const createSession = async (req, res) => {
    const { title, time, free } = req.body

    const session = await sessionModel.create({
        title,
        time,
        course: req.params.id,
        free,
        video: req.file.filename
    })


    return res.status(201).json(session)

}


const getAllSessions = async (req, res) => {
    const sessions = await sessionModel
        .find({})
        .populate("course", "name")
        .lean();

    return res.json(sessions);
};


const getSession = async (req, res) => {

    const isVlidUserID = isValidObjectId(req.params.sessionId)

    if (!isVlidUserID) {
        return res.status(409).json({ message: "User ID is not valid !!" })
    }

    const course = await courseModel.findOne({ href: req.params.href })

    const sesiion = await sessionModel.findOne({ _id: req.params.sessionId })

    const sessions = await sessionModel.find({ course: course._id })

    return res.status(200).json({ sesiion, sessions })

}


const removeSession = async (req , res) => {
    const deleteSession =  await sessionModel.findOneAndDelete({_id : req.params.id})

    if (!deleteSession) {
        return res.status(404).json({massage: "Session not found"})
    }

    return res.json(deleteSession)
}





module.exports = {
    addCourse,
    createSession,
    getAllSessions,
    getSession,
    removeSession
}