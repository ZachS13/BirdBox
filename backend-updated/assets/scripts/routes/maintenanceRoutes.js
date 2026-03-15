const express = require("express");

const business = require("../../layers/business.js");

const router = express.Router();

router.get("/:boxId/schedules", async (req, res) => {
    try {
        const { boxId } = req.params;

        const schedules = await business.getAllMaintenanceSchedulesByBoxId(boxId, false);

        res.status(200).json({ success: true, message: `Box (${boxId}) schedules retrieved successfully.`, data: schedules });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.get("/:boxId/schedules/:scheduleId", async (req, res) => {
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

module.exports = router;
