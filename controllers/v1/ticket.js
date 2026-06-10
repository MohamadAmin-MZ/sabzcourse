const departmentModel = require("../../models/department")
const departmentSubModel = require("../../models/department-sub")
const ticketSubModel = require("../../models/ticket")

const getAll = async (req, res) => {
    const ticket = await ticketSubModel.find({ answer: 0 }).populate("departmendId", "name").populate("departmendSubId", "name").populate("user", "name")
    return res.status(200).json(ticket)
}

const answer = async (req, res) => {
    const { body } = req.body
    const ticketId = req.params.id
    const ticket = await ticketSubModel.findOne({ _id: ticketId })
    const answer = await ticketSubModel.create({
        departmendId: ticket.departmendId,
        departmendSubId: ticket.departmendSubId,
        prioriby: ticket.prioriby,
        title: "جواب تیکت ارسالی",
        body,
        parent: ticket._id,
        user: req.user._id,
        isAnswer: 1,
        answer: 0
    })

    await ticketSubModel.findOneAndUpdate({ _id: ticketId }, { answer: 1 })
    return res.json(answer)
}

const create = async (req, res) => {
    const { departmendId, departmendSubId, prioriby, title, body, course } = req.body

    const ticket = await ticketSubModel.create({
        departmendId,
        departmendSubId,
        prioriby,
        title,
        body,
        user: req.user._id,
        answer: 0,
        isAnswer: 0,
        course
    })
    return res.json(ticket)
}

const departments = async (req, res) => {
    const departments = await departmentModel.find()
    return res.status(200).json(departments)
}

const departmentSubs = async (req, res) => {
    const departmentSubs = await departmentSubModel.find({ parent: req.params.id })
    return res.status(200).json(departmentSubs)
}

const userTickets = async (req, res) => {
    const tickets = await ticketSubModel.find({ user: req.user._id }).sort({ _id: -1 }).populate("departmendId", "name").populate("departmendSubId", "name").populate("user", "name")
    return res.status(200).json(tickets)
}

const getAnswer = async (req, res) => {
    const ticketId = req.params.id

    const ticket = await ticketSubModel.findOne({ _id: ticketId })
    const ticketAnswer = await ticketSubModel.findOne({ parent: ticketId })

    return res.status(200).json({ ticket, ticketAnswer })
}

// const createDepartment = async (req, res) => {
//     const {name} = req.body
//     const create = await departmentModel.create({ name })
//     res.json(create)
// }

// const createDepartmentSub = async (req, res) => {
//     const {name, parent} = req.body
//     const create = await departmentSubModel.create({ name, parent })
//     res.json(create)
// }



module.exports = {
    getAll,
    answer,
    create,
    departments,
    departmentSubs,
    userTickets,
    getAnswer
    // createDepartment,
    // createDepartmentSub
}