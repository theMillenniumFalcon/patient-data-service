const patientService = require('../services/patient.service');

// Search patient by name
exports.findByName = async (req, res, next) => {
    try {
        const { name } = req.query;
        
        if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Patient name is required'
        });
        }
        
        const patients = await patientService.findPatientsByName(name);
        
        return res.status(200).json({
            success: true,
            data: patients
        });
    } catch (error) {
        next(error);
    }
};

// Get patient by ID
exports.findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Patient ID is required'
            });
        }
        
        const patient = await patientService.findPatientById(id);
        
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        next(error);
    }
};