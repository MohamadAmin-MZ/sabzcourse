const userModel = require("../../models/user");
const banUserModel = require("../../models/ban-user");
const { isValidObjectId } = require("mongoose");

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
    return res.status(404).json({message: "user not found.",});
  }

    res.status(200).json("User delete successfully.")

}

module.exports = { banUser, getAll, deletUser }