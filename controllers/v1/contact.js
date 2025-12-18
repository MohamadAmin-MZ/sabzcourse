const { model } = require("mongoose");
const contactModel = require("./../../models/contact");

const getAll = async (req, res) => {
    const contacts = await contactModel.find({});
    return res.json(contacts);
};




module.exports= {
    getAll,
}