const express = require("express");
const business = require("../../layers/business.js");

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const image = await business.getImageById(id);

        res.status(200).json({ success: true, message: `Image (${id}) was fetched successfully.`, data: image });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

router.get("/:id/download", async (req, res) => {
    try {
        const { id } = req.params;

        const image = await business.downloadImageById(id);

        res.status(200).json({ success: true, message: `Image (${id}) was fetched successfully.`, data: image });
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

        const image = await business.deleteImageById(id);

        res.status(200).json({ success: true, message: `Image (${id}) was deleted successfully.`, data: image });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

module.exports = router;
