const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

// Basic box CRUD
router.get('/', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.listBoxes() });
    } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
    try {
        res.status(201).json({ ok: true, data: await business.createBox(req.body) });
    } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.getBoxById(req.params.id) });
    } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.updateBox(req.params.id, req.body) });
    } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.deleteBox(req.params.id) });
    } catch (err) { next(err); }
});

// Box detail endpoints
router.get('/:id/summary', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.getBoxSummary(req.params.id) });
    } catch (err) { next(err); }
});

router.get('/:id/telemetry', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.getBoxTelemetry(req.params.id) });
    } catch (err) { next(err); }
});

router.get('/:id/detections', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.getBoxDetections(req.params.id) });
    } catch (err) { next(err); }
});

router.get('/:id/images', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.getBoxImages(req.params.id) });
    } catch (err) { next(err); }
});

// Maintenance logs under a box
router.get('/:id/maintenance/logs', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.listBoxMaintenanceLogs(req.params.id) });
    } catch (err) { next(err); }
});

router.post('/:id/maintenance/logs', async (req, res, next) => {
    try {
        res.status(201).json({ ok: true, data: await business.createBoxMaintenanceLog(req.params.id, req.body) });
    } catch (err) { next(err); }
});

router.put('/:id/maintenance/logs/:logId', async (req, res, next) => {
    try {
        res.status(200).json({
            ok: true,
            data: await business.updateBoxMaintenanceLog(req.params.id, req.params.logId, req.body)
        });
    } catch (err) { next(err); }
});

router.delete('/:id/maintenance/logs/:logId', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.deleteBoxMaintenanceLog(req.params.id, req.params.logId) });
    } catch (err) { next(err); }
});

// Maintenance schedule under a box
router.get('/:id/maintenance/schedule', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.getBoxMaintenanceSchedule(req.params.id) });
    } catch (err) { next(err); }
});

router.post('/:id/maintenance/schedule', async (req, res, next) => {
    try {
        res.status(201).json({ ok: true, data: await business.createBoxMaintenanceSchedule(req.params.id, req.body) });
    } catch (err) { next(err); }
});

router.put('/:id/maintenance/schedule/:scheduleId', async (req, res, next) => {
    try {
        res.status(200).json({
            ok: true,
            data: await business.updateBoxMaintenanceSchedule(req.params.id, req.params.scheduleId, req.body)
        });
    } catch (err) { next(err); }
});

router.delete('/:id/maintenance/schedule/:scheduleId', async (req, res, next) => {
    try {
        res.status(200).json({
            ok: true,
            data: await business.deleteBoxMaintenanceSchedule(req.params.id, req.params.scheduleId)
        });
    } catch (err) { next(err); }
});

// Settings under a box
router.get('/:id/settings', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.getBoxSettings(req.params.id) });
    } catch (err) { next(err); }
});

router.put('/:id/settings', async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.updateBoxSettings(req.params.id, req.body) });
    } catch (err) { next(err); }
});

module.exports = router;