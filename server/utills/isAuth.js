const db = require('./database');
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    const token = req.header('Authentication').split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const query = `SELECT id, first_name, last_name, email, is_admin FROM users WHERE email = ?`;

    try {
        const [ user ] = await db.query(query, [decoded.identifier]);
        const [ userInfo ] = user;
        req.user = userInfo;
        next();        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = isAuth;