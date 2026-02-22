const contactModel = require("./../../models/contact");
const nodemailer = require("nodemailer")

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
    const deletedContact = await contactModel.findOneAndDelete({
        _id: req.params.id,
    });

    if (!deletedContact) {
        return res.status(404).json({ message: "Contact not found !!" });
    }

    return res.json(deletedContact);
};

const answer = async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mohamadaminmohamadzadeh1@gmail.com",
            pass: "tnnw jlmm gmxd aphf",
        },
    });

    const mailOptions = {
        from: "mohamadaminmohamadzadeh1@gmail.com",
        to: req.body.email,
        subject: "پاسخ پیغام شما از سمت آکادمی سبزکورس",
        text: req.body.answer,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            return res.json({ message: error });
        } else {
            const contact = await contactModel.findOneAndUpdate(
                {
                    email: req.body.email,
                },
                { answer: 1 }
            );
            return res.json({ message: "Email sent successfully :))" });
        }
    });
};


module.exports = {
    getAll,
    create,
    remove,
    answer
}