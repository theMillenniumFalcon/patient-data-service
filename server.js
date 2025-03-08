const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patient.routes');
const { connectMongoDB, connectPostgres } = require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoDB();
connectPostgres();

app.use('/api/patients', patientRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});