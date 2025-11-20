const userModel = require("../../models/user")
const registerValodator = require("../../validators/register")


const register = async (req, res) => {
    const validationResult = registerValodator(req.body)

    if (validationResult !== true) {
        return res.status(422).json(validationResult)
    }

    const { username, name, email, password, phone } = req.body

    const isUserExists = userModel.findOne({ $or: [{ username }, { email }] })

    if (isUserExists) {
        return res.status(409).json({
            masage: "username or email is duplicated"
        })
    }

    res.json("User Is Register.")
}

const login = async () => { }

const getMe = async () => { }

module.exports = {
    register,
    login,
    getMe
}

