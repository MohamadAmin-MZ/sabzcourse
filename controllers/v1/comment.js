const commentModel = require("../../models/comment")
const courseModel = require("../../models/course")


const createComment = async (req, res) => {
    const { body, courseHref, score } = req.body

    const course = await courseModel.findOne({ href: courseHref })

    const newComment = await commentModel.create({
        body,
        course: course._id,
        creator: req.user._id,
        isAccept: 0,
        score,
        isAnswer: 0
    })

    return res.status(201).json(newComment)

}

const remove = async (req, res) => {
    const deletedComment = await commentModel.findOneAndDelete({
        _id: req.params.id,
    });

    if (!deletedComment) {
        return res.status(404).json({
            message: "Comment not found !!",
        });
    }

    return res.json(deletedComment);

}


module.exports = {
    createComment,
    remove
}