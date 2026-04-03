const express = require("express");
const business = require("../../layers/business.js");

const router = express.Router();

router.get("/", async (_, res) => {
    try {
        const species = await business.listAllSpecies();

        res.status(200).json({ success: true, message: "All species retrieved successfully.", data: species });
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

        const species = await business.getSpeciesById(id);

        res.status(200).json({ success: true, message: `Species (${id}) retrieved successfully.`, data: species });
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

        const speciesId = await business.createNewSpecies(body);

        res.status(201).json({ success: true, message: "New species created successfully.", data: speciesId });
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

        const species = await business.updateSpecies(id, body);

        res.status(200).json({ success: true, message: `Species (${id}) updated successfully.`, data: species });
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

        const isDeleted = await business.deleteSpecies(id);

        res.status(200).json({ success: true, message: `Species (${id}) deleted successfully.`, data: isDeleted });
    } catch (e) {
        res.status(e.status || 500).json({
            success: false,
            message: e.message,
        });
    }
});

module.exports = router;
