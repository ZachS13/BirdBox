const express = require("express");
const business = require("../../layers/business.js");

const router = express.Router();

router.get("/summary", async (req, res) => {
    try {
        const { year, month } = req.query;

        const summary = await business.getReportSummary(year, month);

        res.status(200).json({ success: true, message: "Report summary was retrieved successfully.", data: summary });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.get("/species", async (req, res) => {
    try {
        const { year, month } = req.query;

        const species = await business.getReportSpeciesAnalysis(year, month);

        res.status(200).json({ success: true, message: "Report species were retrieved successfully.", data: species });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.get("/history", async (req, res) => {
    try {
        const { month } = req.query;

        const history = await business.getReportSeasonalHistory(month);

        res.status(200).json({ success: true, message: "Report history was retrieved successfully.", data: history });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

module.exports = router;
