const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/', async (req, res) => {
    try {
        const boxes = await business.listBoxes();
        res.status(200).json({ success: true, data: boxes });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const box = await business.createBox(req.body);
        res.status(201).json({ success: true, data: box });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.getBoxById(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.updateBox(req.params.id, req.body) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.deleteBox(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

// Box detail endpoints
router.get('/:id/summary', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.getBoxSummary(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id/telemetry', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.getBoxTelemetry(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id/detections', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.getBoxDetections(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id/images', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.getBoxImages(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

// Maintenance logs under a box
router.get('/:id/maintenance/logs', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.listBoxMaintenanceLogs(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/:id/maintenance/logs', async (req, res) => {
    try {
        res.status(201).json({ success: true, data: await business.createBoxMaintenanceLog(req.params.id, req.body) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.put('/:id/maintenance/logs/:logId', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: await business.updateBoxMaintenanceLog(req.params.id, req.params.logId, req.body)
        });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/:id/maintenance/logs/:logId', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.deleteBoxMaintenanceLog(req.params.id, req.params.logId) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

// Maintenance schedule under a box
router.get('/:id/maintenance/schedule', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.getBoxMaintenanceSchedule(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/:id/maintenance/schedule', async (req, res) => {
    try {
        res.status(201).json({ success: true, data: await business.createBoxMaintenanceSchedule(req.params.id, req.body) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.put('/:id/maintenance/schedule/:scheduleId', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: await business.updateBoxMaintenanceSchedule(req.params.id, req.params.scheduleId, req.body)
        });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/:id/maintenance/schedule/:scheduleId', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: await business.deleteBoxMaintenanceSchedule(req.params.id, req.params.scheduleId)
        });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

// Settings under a box
router.get('/:id/settings', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.getBoxSettings(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.put('/:id/settings', async (req, res) => {
    try {
        res.status(200).json({ success: true, data: await business.updateBoxSettings(req.params.id, req.body) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;