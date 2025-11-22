const adminAuthentication = async (req, res, next) => {
    
    const isAmin = req.user.role === "ADMIN"

    if (isAmin) {
        return next()
    }

    return res.status(403).json({message: "This route is accessible only for admins !!"})
}

module.exports = { adminAuthentication }