const { json } = require("body-parser")
const menuModel = require("../../models/menu")


const getAll = async (req, res) => {
    const menus = await menuModel.find({}).lean()

    menus.forEach((menu) => {
        const subMenu = []
        for (let i = 0; i < menus.length; i++) {
            const mainMenu = menus[i]
            if (String(mainMenu.parent) === String(menu._id)) {
                subMenu.push(menus.splice(i, 1)[0])
                i = i - 1
            }
        }
        menu.subMenu = subMenu
    })
    return res.json(menus)
}

const create = async (req, res) => {
    const { tital, href, parent } = req.body

    const menu = await menuModel.create({
        tital,
        href,
        parent
    })

    return res.status(200).json(menu)
}

const remove = async (req, res) => {
    const menuId = req.params.id

    const menuRmoved = await menuModel.deleteOne({ _id: menuId })
    return res.json(menuRmoved)
}

const update = async (req, res) => {
    try {
        const menuId = req.params.id;

        const { tital, href, parent } = req.body;

        const updateData = {};
        if (tital) updateData.tital = tital;
        if (href) updateData.href = href;
        if (parent) updateData.parent = parent;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "حداقل یک فیلد برای آپدیت لازم است (tital یا href یا parent)"
            });
        }

        const updatedMenu = await menuModel.findByIdAndUpdate(
            menuId,
            { $set: updateData },
            { new: true }
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: "منو یافت نشد" });
        }

        res.json({
            message: "آپدیت با موفقیت انجام شد",
            menu: updatedMenu
        });

    } catch (error) {
        res.status(500).json({
            message: "خطا در آپدیت منو",
            error: error.message
        });
    }
};


const getAllInPanel = async (req, res) => {

}

module.exports = {
    getAll,
    create,
    remove,
    update,
    getAllInPanel
}