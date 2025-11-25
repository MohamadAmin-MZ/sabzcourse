const courseModel = require("../../models/course")

const create = async (req, res) => {
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
        .populate("creat", "-password");


    res.status(201).json(mainCourse)



}




module.exports = {
    create
}