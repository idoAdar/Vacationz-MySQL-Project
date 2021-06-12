const db = require('../utills/database');

exports.allVacations = async (req, res, next) => {
    const query = `SELECT vacations.id, 
            		destination, 
            		description, 
                    starts_at, 
                    ends_at, 
                    image, 
                    price, 
                    COUNT(vacation_id) AS followers 
                FROM vacations 
                LEFT JOIN followers ON vacations.id = followers.vacation_id 
                GROUP BY vacations.id
                ORDER BY vacations.id DESC;`;
    try {
        const [ vacations ] = await db.query(query);
        return res.status(200).json(vacations);
    } catch (error) {
        next(error);
    }
}

exports.userVacations = async (req, res, next) => {
    const userId = req.user.id;
    const query = `SELECT v.id,
                    v.destination, 
                    v.description, 
                    v.starts_at, 
                    v.ends_at, 
                    v.image, 
                    v.price, 
                    followers.user_id,
                (SELECT COUNT(*) 
                FROM followers 
                WHERE vacation_id = v.id) AS followers
                FROM vacations v
                LEFT JOIN followers ON v.id = followers.vacation_id && followers.user_id = ?     
                ORDER BY  followers.user_id DESC`;
    try {
        const [ vacations ] = await db.query(query, userId);
        if (vacations.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).json(vacations);
    } catch (error) {
        next(error);
    }
}

exports.follow = async (req, res, next) => {
    const userId = req.user.id;
    const vacationId = Number(req.params.vacationId);

    try {
        const checkQuery = `SELECT vacation_id FROM followers WHERE user_id = ? AND vacation_id = ?`;
        const [ follows ] = await db.query(checkQuery, [userId, vacationId]);
        if (follows.length > 0) {
            return res.status(401).json({ message: 'Vacation already selected' });
        }
        
        const insertQuery = `INSERT INTO followers(vacation_id, user_id) VALUES (?, ?)`;
        await db.query(insertQuery, [vacationId, userId]);
        return res.status(200).json({ message: `Vacation number ${vacationId} was added to your followers list` });
    } catch (error) {
        next(error);
    }
}

exports.unfollow = async (req, res, next) => {
    const userId = req.user.id;
    const vacationId = Number(req.params.vacationId);

    try {
        const query = `DELETE FROM followers WHERE user_id = ? AND vacation_id = ?`;
        await db.query(query, [userId, vacationId]);
        return res.status(200).json({ message: `Vacation number ${vacationId} was removed from your followers list.` });
    } catch (error) {
        next(error);
    }
}