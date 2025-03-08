const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.config');

const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blood: {
        type: DataTypes.STRING
    },
    reportType: {
        type: DataTypes.STRING
    },
    roomNo: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'patients',
    timestamps: true
});

(async () => {
    try {
        await Patient.sync();
        console.log('PostgreSQL Patient model synced');
    } catch (error) {
        console.error('Error syncing PostgreSQL Patient model:', error);
    }
})();

module.exports = Patient;