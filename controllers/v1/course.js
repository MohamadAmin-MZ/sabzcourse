const courseModel = require("../../models/course")
const sessionModel = require("../../models/session")
const { isValidObjectId } = require("mongoose")
const courseUserModel = require("../../models/course-user")
const categoryModel = require("../../models/category")

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


const removeSession = async (req, res) => {
    const deleteSession = await sessionModel.findOneAndDelete({ _id: req.params.id })

    if (!deleteSession) {
        return res.status(404).json({ massage: "Session not found" })
    }

    return res.json(deleteSession)
}

const register = async (req, res) => {
    const price = req.body.price

    const isUserAlredyRegistered = await courseUserModel.findOne({
        user: req.user._id,
        course: req.params.id
    })

    if (isUserAlredyRegistered) {
        return res.status(409).json({massage: "user already register in this course."})
    }

    const register = await courseUserModel.create({
        user: req.user._id,
        course: req.params.id,
        price
    })

    return res.status(201).json({massage: "you are registered successfully."})
}

const getCoursesByCategory = async (req, res) => {
  const { href } = req.params;
  const category = await categoryModel.findOne({ href });

  if (category) {
    const categoryCourses = await courseModel.find({
      categoryID: category._id,
    });

    res.json(categoryCourses);
  } else {
    res.josn([]);
  }
}



module.exports = {
    addCourse,
    createSession,
    getAllSessions,
    getSession,
    removeSession,
    register,
    getCoursesByCategory
}