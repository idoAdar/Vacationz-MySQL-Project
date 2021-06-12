const express = require('express');
const { body } = require('express-validator');
const authController = require('../logic/authController');

const route = express.Router();

// DESC: Create New User
// Url: http://localhost:5000/register
// Method: POST
// Security: Public
route.post('/register', [
    body('firstName', 'First Name is require').notEmpty(),
    body('lastName', 'Last Name is require').notEmpty(),
    body('email', 'Valid Email is require').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
], authController.register);

// DESC: Login User
// Url: http://localhost:5000/login
// Method: POST
// Security: Public
route.post('/login', [
    body('email', 'Valid Email is require').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
], authController.loging);

// DESC: Google Login
// Url: http://localhost:5000/google-login
// Method: POST
// Security: Public
route.post('/google-login', [
    body('email', 'Valid Email is require').isEmail()
], authController.googleLogin);

module.exports = route;