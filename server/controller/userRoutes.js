const express = require('express');
const userController = require('../logic/userController');
const isAuth = require('../utills/isAuth');

const route = express.Router();

// DESC: Get All Vacations
// Url: http://localhost:5000/users
// Method: GET
// Security: Public
route.get('/', userController.allVacations);

// DESC: Get User Vacations
// Url: http://localhost:5000/users/user-follows
// Method: GET
// Security: Private
route.get('/user-follows', isAuth, userController.userVacations);

// DESC: Follow
// Url: http://localhost:5000/users/follow/:vacationId
// Method: POST
// Security: Private
route.post('/follow/:vacationId', isAuth, userController.follow);

// DESC: Unfollow
// Url: http://localhost:5000/users/unfollow/:vacationId
// Method: DELETE
// Security: Private
route.delete('/unfollow/:vacationId', isAuth, userController.unfollow);

module.exports = route;