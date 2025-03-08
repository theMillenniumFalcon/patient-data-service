const MongoPatient = require('../models/mongodb/patient.model');
const PostgresPatient = require('../models/postgres/patient.model');
const { Op } = require('sequelize');

exports.findPatientsByName = async (name) => {
    try {
        // Query MongoDB
        const mongoPromise = MongoPatient.find({
            name: { $regex: name, $options: 'i' }
        }).select('id name blood reportType roomNo').lean();
        
        // Query PostgreSQL
        const postgresPromise = PostgresPatient.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        attributes: ['id', 'name', 'blood', 'reportType', 'roomNo']
        });
        
        // Execute queries concurrently
        const [mongoResults, postgresResults] = await Promise.all([
            mongoPromise,
            postgresPromise
        ]);
        
        // Format PostgreSQL results
        const formattedPostgresResults = postgresResults.map(patient => patient.toJSON());
        
        // Combine results from both databases
        const combinedResults = [...mongoResults, ...formattedPostgresResults];
        
        // Return combined results
        return combinedResults;
    } catch (error) {
        console.error('Error finding patients by name:', error);
        throw error;
    }
};

// Find patient by ID across both databases
exports.findPatientById = async (id) => {
    try {
        const mongoPromise = MongoPatient.findOne({ id }).lean();
        
        const postgresPromise = PostgresPatient.findByPk(id);
        
        const [mongoResult, postgresResult] = await Promise.all([
            mongoPromise,
            postgresPromise
        ]);
        
        // Return the first non-null result
        if (mongoResult) {
            return mongoResult;
        }
        
        if (postgresResult) {
            return postgresResult.toJSON();
        }
        
        return null;
    } catch (error) {
        console.error('Error finding patient by ID:', error);
        throw error;
    }
};