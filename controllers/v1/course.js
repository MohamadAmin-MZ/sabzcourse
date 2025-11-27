const courseModel = require("../../models/course")
const sessionModel = require("../../models/session")

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
    const { title, time, free} = req.body

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



module.exports = {
    addCourse,
    createSession,
    getAllSessions
}