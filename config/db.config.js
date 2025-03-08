const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/patientdb';
const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/patientdb',
    {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: process.env.NODE_ENV === 'production' ? {
                require: true,
                rejectUnauthorized: false
            } : false
        }
    }
);

const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected successfully');
    } catch (error) {
        console.error('PostgreSQL connection error:', error);
        process.exit(1);
    }
};

module.exports = {
    connectMongoDB,
    connectPostgres,
    sequelize,
    mongoose
};
