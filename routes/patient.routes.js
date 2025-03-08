const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

// Search patients by name
router.get('/search', patientController.findByName);

// Get patient by ID
router.get('/:id', patientController.findById);

module.exports = router;