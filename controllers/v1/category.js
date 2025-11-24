const categoriesModel = require("../../models/category")
const mongoose = require("mongoose")




const create = async (req, res) => {

    try {
        const { title, href } = req.body

        if (!title || !href) {
            return res.status(400).json({
                message: "Both title and href are required"
            });
        }

        if (typeof title !== "string" || typeof href !== "string") {
            return res.status(400).json({
                message: "title and href must be strings"
            });
        }

        if (title.trim().length < 2) {
            return res.status(400).json({
                message: "title must be at least 2 characters long"
            });
        }

        const newCategiry = await categoriesModel.create({ title, href })

        return res.status(200).json(newCategiry)
    } catch (err) {
        console.error("Error in create category:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getAll = async (req, res) => {

    const gategories = await categoriesModel.find()

    return res.json(gategories)
}




module.exports = {
    create,
    getAll
}