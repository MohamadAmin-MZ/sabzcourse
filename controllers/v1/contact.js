const { model } = require("mongoose");
const contactModel = require("./../../models/contact");

const getAll = async (req, res) => {
    const contacts = await contactModel.find({});
    return res.json(contacts);
};

const create = async (req, res) => {
    const { name, email, phone, body } = req.body;

    const contact = await contactModel.create({
        name,
        email,
        phone,
        body,
        answer: 0,
    });

    return res.status(201).json(contact);
};

const remove = async (req, res) => {
    // Validate ...
    const deletedContact = await contactModel.findOneAndRemove({
        _id: req.params.id,
    });

    if (!deletedContact) {
        return res.status(404).json({ message: "Contact not found !!" });
    }

    return res.json(deletedContact);
};



module.exports= {
    getAll,
    create,
    remove
}