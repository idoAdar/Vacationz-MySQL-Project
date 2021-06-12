const isAdmin = (req, res, next) => {
    const admin = req.user.is_admin.readUInt8();
    if (admin === 0) {
        return res.status(401).json({ message: 'Unauthorized - Not Admin' });
    }
    next();
}

module.exports = isAdmin;