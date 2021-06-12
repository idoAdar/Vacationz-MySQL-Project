const db = require('../utills/database');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;
    const query = `SELECT email FROM users WHERE email = ?`;
    
    try {
        const [ findExistUser ] = await db.query(query, [email]);
        if (findExistUser.length > 0) {
            return res.status(403).json({ message: 'User already found' });
        }
        
        const insertQuery = 'INSERT INTO users(first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
        const hashPassword = await bcryptjs.hash(password, 12);
        await db.query(insertQuery, [firstName, lastName, email, hashPassword]);

        const payload = { identifier: email };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(200).json({ username: firstName, token, isAdmin: 0 });
    } catch (error) { 
        next(error);
    }
}

exports.loging = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;

    try {
        const [ findExistUser ] = await db.query(query, [email]);
        if (findExistUser.length === 0) {
            return res.status(403).json({ message: 'User not found' });
        }

        const [ user ] = findExistUser;
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password'});
        }
        const payload = { identifier: email };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        
        const admin = user.is_admin.readUInt8();
        
        return res.status(200).json({ username: user.first_name, token, isAdmin: admin });
    } catch (error) {
        next(error);
    }
}

exports.googleLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }
    
    const { email } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;

    try {
        const [ findExistUser ] = await db.query(query, [email]);
        if (findExistUser.length === 0) {
            return res.status(403).json({ message: 'User not found' });
        }

        const [ user ] = findExistUser;
        const payload = { identifier: email };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        const admin = user.is_admin.readUInt8();
        
        return res.status(200).json({ username: user.first_name, token, isAdmin: admin });
    } catch (error) {
        next(error);
    }
}