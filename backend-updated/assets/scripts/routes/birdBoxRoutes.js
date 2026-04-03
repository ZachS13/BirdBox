const express = require("express");

const business = require("../../layers/business.js");

const router = express.Router();

/* ---------------- BOXES ---------------- */

router.get("/", async (_, res) => {
    try {
        const boxes = await business.listAllBoxes();

        res.status(200).json({ success: true, message: "All boxes retrieved successfully.", data: boxes });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const box = await business.getBoxById(id);

        res.status(200).json({ success: true, message: `Box (${id}) retrieved successfully.`, data: box });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { body } = req;

        const box = await business.createNewBox(body);

        res.status(201).json({ success: true, message: "New box created successfully.", data: box });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const box = await business.updateBox(id, body);

        res.status(200).json({ success: true, message: `Box (${id}) updated successfully.`, data: box });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const isDeleted = await business.deleteBoxById(id);

        res.status(200).json({ success: true, message: isDeleted ? `Box (${id}) deleted successfully.` : "No changes were made.", data: isDeleted });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

/* ---------------- SUMMARY ---------------- */

// router.get("/:id/summary", async (req, res) => {
//     try {
//         res.status(200).json({ success: true, data: await business.getBoxSummary(req.params.id) });
//     } catch (e) {
//         res.status(e.status || 500).json({
//             success: false,
//             message: e.message,
//         });
//     }
// });

/* ---------------- TELEMETRY ---------------- */

// router.get("/:id/telemetry", async (req, res) => {
//     try {
//         res.status(200).json({ success: true, data: await business.getBoxTelemetry(req.params.id) });
//     } catch (e) {
//         res.status(e.status || 500).json({
//             success: false,
//             message: e.message,
//         });
//     }
// });

/* ---------------- DETECTIONS ---------------- */

// router.get("/:id/detections", async (req, res) => {
//     try {
//         res.status(200).json({ success: true, data: await business.getBoxDetections(req.params.id) });
//     } catch (e) {
//         res.status(e.status || 500).json({
//             success: false,
//             message: e.message,
//         });
//     }
// });

/* ---------------- IMAGES ---------------- */

// router.get("/:id/images", async (req, res) => {
//     try {
//         res.status(200).json({ success: true, data: await business.getBoxImages(req.params.id) });
//     } catch (e) {
//         res.status(e.status || 500).json({
//             success: false,
//             message: e.message,
//         });
//     }
// });

/* ---------------- MAINTENANCE ---------------- */

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
