const userModel = require("../../models/user");
const banUserModel = require("../../models/ban-user");

const banUser = async (req, res) => {
    const mainUser = await userModel.findOne({ _id: req.params.id }).lean();
    const banUserResult = banUserModel.create({ phone: mainUser.phone });

    if (banUserResult) {
        return res.status(200).json({ message: "User ban successfully :))" });
    }

    return res.status(500).json({ message: "Server Error !!" });
};

module.exports = { banUser }