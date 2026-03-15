const express = require("express");
const business = require("../../layers/business.js");

const router = express.Router();

router.get("/identified-species", async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.analyticsIdentifiedSpecies() });
    } catch (err) {
        next(err);
    }
});

router.get("/occupancy-trend", async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.analyticsOccupancyTrend() });
    } catch (err) {
        next(err);
    }
});

router.get("/daily-activity", async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.analyticsDailyActivity() });
    } catch (err) {
        next(err);
    }
});

router.get("/target-efficiency", async (req, res, next) => {
    try {
        res.status(200).json({ ok: true, data: await business.analyticsTargetEfficiency() });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
