const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    blood: { type: String },
    reportType: { type: String },
    roomNo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);