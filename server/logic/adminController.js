const db = require('../utills/database');
const { validationResult } = require('express-validator');

exports.createVacation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }

    const { destination, 
        description, 
        starts_at, 
        ends_at, 
        image, 
        price } = req.body;

    const query = `INSERT INTO vacations(destination, description, starts_at, ends_at, image, price) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
    try {
        await db.query(query, [destination, description, starts_at, ends_at, image, price]);
        return res.status(200).json({ message: 'New vacation added' });
    } catch (error) {
        next(error);
    }
}

exports.updateVacation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }

    const vacationId = req.params.vacationId;
    const { destination, 
        description, 
        starts_at, 
        ends_at, 
        image, 
        price } = req.body;
    
    const query = `UPDATE vacations SET 
                    destination = ?, 
                    description = ?, 
                    starts_at = ?, 
                    ends_at = ?, 
                    image = ?, 
                    price = ? 
                WHERE id = ?`;
    try {
        await db.query(query, [destination, description, starts_at, ends_at, image, price, vacationId]);
        return res.status(200).json({ message: 'Vacation updated' });
    } catch (error) {
        next(error);
    }
}

exports.deleteVacation = async (req, res, next) => {
    const vacationId = req.params.vacationId;
    const deleteFQuery = `DELETE FROM followers WHERE vacation_id = ?`;
    const deleteVQuery = `DELETE FROM vacations WHERE id = ?`;
    
    try {
        await db.query(deleteFQuery, [vacationId]);
        await db.query(deleteVQuery, [vacationId]);
        return res.status(200).json({ message: `Vacation number ${vacationId} removed` });
    } catch (error) {
        next(error);
    }
}