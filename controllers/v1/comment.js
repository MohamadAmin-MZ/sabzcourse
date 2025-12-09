const { json } = require("body-parser")
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

const accept = async (req, res) => {
    const acceptedComment = await commentModel.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { isAccept: 1 }
    );

    if (!acceptedComment) {
        return res.status(404).json({
            message: "Comment not found !!",
        });
    }

    return res.json({ message: "Comment accepted successfully" });
}

const reject = async (req, res) => {
    const rejectedComment = await commentModel.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { isAccept: 0 }
    );

    if (!rejectedComment) {
        return res.status(404).json({
            message: "Comment not found !!",
        });
    }

    return res.json({ message: "Comment rejected successfully" });
}

const answer = async (req, res) => {
    const { body } = req.body
    const acceptedComment = await commentModel.findOneAndUpdate({ _id: req.params.id }, { isAccept: 1 })

    if (!acceptedComment) {
        return res.status(404).json({ massage: "comment not found." })
    }

    const answerComment = await commentModel.create({
        body,
        course: acceptedComment.course,
        creator: req.user._id,
        isAnswer: 1,
        isAccept: 1,
        mainCommentID: req.params.id
    })

    return res.status(201).json(answerComment)
}

const getAll = async (req, res) => {
    const comments = await commentModel
        .find()
        .populate("course")
        .populate("creator", "-password")
        .lean();

    // Codes ...

    return res.json(comments);
};


module.exports = {
    createComment,
    remove,
    accept,
    reject,
    answer,
    getAll
}