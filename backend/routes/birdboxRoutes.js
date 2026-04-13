const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/', async (req, res) => {
    try {
        console.log('Received request to list all bird boxes');
        const boxes = await business.listBoxes();
        console.log(`Retrieved boxes: ${JSON.stringify(boxes[0])}`);
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
        console.log(`Received request to get bird box with ID: ${req.params.id}`);
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
        const { id } = req.params;
        const { body } = req;
        
        const box = await business.updateBox(id, body);
        res.status(200).json({ success: true, message: `Box (${id}) updated successfully.`, data: box });
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

/* ------------- ANALYTICS ENDPOINTS ------------- */
router.get('/:id/analytics/week', async (req, res) => {
    try {
        const { id } = req.params;
        const detections = await business.getBoxDetectionsPerWeek(id);
        res.status(200).json({ success: true, data: detections });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id/analytics/month', async (req, res) => {
    try {
        const { id } = req.params;
        const detections = await business.getBoxDetectionsPerMonth(id);
        res.status(200).json({ success: true, data: detections });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

/* ------------- IMAGES ENDPOINTS ------------- */

router.get('/:id/images', async (req, res) => {
    try {
        const { id } = req.params;
        const images = await business.getBoxImages(id);
        res.status(200).json({ success: true, data: images });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id/images/:imageId', async (req, res) => {
    try {
        const { boxId, imageId } = req.params;
        const image = await business.getBoxImageByImageId(boxId, imageId);
        res.status(200).json({ success: true, data: image });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});


/* ---------------- MAINTENANCE ---------------- */

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
router.get("/:boxId/maintenance/schedules", async (req, res) => {
    try {
        const { boxId } = req.params;

        const schedules = await business.getAllMaintenanceSchedulesByBoxId(boxId, true);

        res.status(200).json({ success: true, message: `Box (${boxId}) schedules retrieved successfully.`, data: schedules });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.get("/:boxId/maintenance/schedules/:scheduleId", async (req, res) => {
    try {
        const { boxId, scheduleId } = req.params;

        const schedule = await business.getMaintenanceScheduleById(scheduleId, boxId);

        res.status(200).json({ success: true, message: `Box (${boxId}) schedule (${scheduleId}) retrieved successfully.`, data: schedule });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.post("/:boxId/maintenance/schedules", async (req, res) => {
    try {
        const {
            body,
            params: { boxId },
        } = req;

        const schedule = await business.createNewMaintenanceSchedule(boxId, body);

        res.status(201).json({ success: true, message: "New box schedule created successfully.", data: schedule });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.put("/:boxId/maintenance/schedules/:scheduleId/status", async (req, res) => {
    try {
        const {
            body,
            params: { boxId, scheduleId },
        } = req;

        const schedule = await business.updateMaintenanceScheduleStatus(scheduleId, boxId, body);

        res.status(200).json({ success: true, message: schedule ? `Box (${boxId}}) schedule (${scheduleId}) was updated successfully.` : "No changes were necessary.", data: schedule });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.delete("/:boxId/maintenance/schedules/:scheduleId", async (req, res) => {
    try {
        const { boxId, scheduleId } = req.params;

        const isDeleted = await business.deleteMaintenanceSchedule(scheduleId, boxId);

        res.status(200).json({ success: true, message: isDeleted ? `Box (${boxId}}) schedule (${scheduleId}) was deleted successfully.` : "No changes were necessary.", data: isDeleted });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

module.exports = router;