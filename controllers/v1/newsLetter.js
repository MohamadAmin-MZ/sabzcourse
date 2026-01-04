const newsLetterModel = require("./../../models/newsletter")

const getAll = async (req, res) => {
    const emails = await newsLetterModel.find({})
    return res.json(emails)
}

const creat = async (req, res) => {
    const { email } = req.body
    const newEmail = await newsLetterModel.create({ email })
    return res.json(newEmail)
}


module.exports = {
    getAll,
    creat
}