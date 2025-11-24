const userModel = require("../../models/user");
const banUserModel = require("../../models/ban-user");
const registerValodator = require("../../validators/register")
const bcrypt = require("bcrypt")
const { isValidObjectId } = require("mongoose");
const { request } = require("express");

const getAll = async (req, res) => {
    const users = await userModel.find().select("-password")

    res.status(200).json(users)

}

const banUser = async (req, res) => {
    const mainUser = await userModel.findOne({ _id: req.params.id }).lean();
    const banUserResult = banUserModel.create({ phone: mainUser.phone });

    if (banUserResult) {
        return res.status(200).json({ message: "User ban successfully :))" });
    }

    return res.status(500).json({ message: "Server Error !!" });
};

const deletUser = async (req, res) => {
    const isVlidUserID = isValidObjectId(req.params.id)

    if (!isVlidUserID) {
        return res.status(409).json({ message: "User ID is not valid !!" })
    }

    const deleteUser = await userModel.findByIdAndDelete({ _id: req.params.id });

    if (!deleteUser) {
        return res.status(404).json({ message: "user not found.", });
    }

    res.status(200).json("User delete successfully.")

}

const changeRole = async (req, res) => {
    const { id } = req.body;
    const isValidUserID = isValidObjectId(id);

    if (!isValidUserID) {
        return res.status(409).json({
            message: "User ID is not valid !!",
        });
    }

    const user = await userModel.findOne({ _id: id });

    let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    const updatedUser = await userModel.findByIdAndUpdate(
        { _id: id },
        {
            role: newRole,
        }
    );

    if (updatedUser) {
        return res.json({
            message: "User role changed successfully :))",
        });
    }
};

const editUser = async (req, res) => {

    const validationResult = registerValodator(req.body)

    if (validationResult !== true) {
        return res.status(422).json(validationResult)
    }

    const { username, name, email, password, phone } = req.body

    const passwordHash = await bcrypt.hash(password, 12)

    const editUser = await userModel.findOneAndUpdate(
        {
            _id: req.user._id
        },
        {
            username,
            name,
            email,
            password: passwordHash,
            phone
        },
        {
            returnDocument: "after"
        }
    ).select("-password").lean()

    return res.json(editUser)
}


module.exports = { banUser, getAll, deletUser, changeRole, editUser }