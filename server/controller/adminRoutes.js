const express = require('express');
const { body } = require('express-validator');
const adminController = require('../logic/adminController');
const isAuth = require('../utills/isAuth');
const isAdmin = require('../utills/isAdmin');

const route = express.Router();

// DESC: Create New Vacation
// Url: http://localhost:5000/admin/new-vacation
// Method: POST
// Security: Admin
route.post('/new-vacation', [
    isAuth, 
    isAdmin,
    body('destination', 'Destination is require').notEmpty(),
    body('description', 'Description is require').notEmpty(),
    body('starts_at', 'Starting date is require').notEmpty(),
    body('ends_at', 'Ending date is require').notEmpty(),
    body('image', 'Image is require').notEmpty(),
    body('price', 'Price is require').notEmpty()
], adminController.createVacation);

// DESC: Update Vacation
// Url: http://localhost:5000/admin/update-vacation/:vacationId
// Method: PUT
// Security: Admin
route.put('/update-vacation/:vacationId', [
    isAuth,
    isAdmin,
    body('destination', 'Destination is require').notEmpty(),
    body('description', 'Description is require').notEmpty(),
    body('starts_at', 'Starting date is require').notEmpty(),
    body('ends_at', 'Ending date is require').notEmpty(),
    body('image', 'Image is require').notEmpty(),
    body('price', 'Price is require').notEmpty()
], adminController.updateVacation);

// DESC: Remove Vacation
// Url: http://localhost:5000/admin/delete-vacation/:vacationId
// Method: DELETE
// Security: Admin
route.delete('/delete-vacation/:vacationId', [isAuth, isAdmin], adminController.deleteVacation);

module.exports = route;