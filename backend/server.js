const express = require('express');

const authRoutes = require('./routes/authRoutes.js');
const meRoutes = require('./routes/meRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const boxRoutes = require('./routes/birdboxRoutes.js');
const detectionRoutes = require('./routes/detectionRoutes.js');
const analyticsRoutes = require('./routes/analyticsRoutes.js');
const imageRoutes = require('./routes/imageRoutes.js');
const maintenanceRoutes = require('./routes/maintenanceRoutes.js');
const exportRoutes = require('./routes/exportRoutes.js');
const speciesRoutes = require('./routes/speciesRoutes.js');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mount routes
app.use('/auth', authRoutes);
app.use('/', meRoutes); // /me
app.use('/users', userRoutes);
app.use('/boxes', boxRoutes);
app.use('/detections', detectionRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/images', imageRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/exports', exportRoutes);
app.use('/species', speciesRoutes);

// Central error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        ok: false,
        message: err.message || 'Server error'
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({ ok: false, message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});