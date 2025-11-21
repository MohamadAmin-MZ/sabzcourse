const userModel = require("../../models/user")
const registerValodator = require("../../validators/register")
const banUserModel = require("../../models/ban-user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const register = async (req, res) => {
    const validationResult = registerValodator(req.body)

    if (validationResult !== true) {
        return res.status(422).json(validationResult)
    }

    const { username, name, email, password, phone } = req.body

    const isBanUser = await banUserModel.findOne({ phone: phone })
    console.log(isBanUser);
    
    if (isBanUser) {
        return res.status(409).json({ message: "username is ban." })
    }

    const isUserExists = await userModel.findOne({ $or: [{ username }, { email }] })

    if (isUserExists) {
        return res.status(409).json({
            message: "username or email is duplicated"
        })
    }

    const countOfUser = await userModel.countDocuments();

    const userPasswordHash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        name,
        email,
        password: userPasswordHash,
        phone,
        role: countOfUser > 0 ? "User" : "Admin"
    })

    const accessUserJwt = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 day" })

    return res.status(201).json({
        user: {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }, accessUserJwt
    })

}

const login = async () => { }

const getMe = async () => { }

module.exports = {
    register,
    login,
    getMe
}

