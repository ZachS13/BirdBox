const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/:id', async (req, res) => {
    try {
        const data = await business.getDetectionById(req.params.id);
        res.status(200).json({ ok: true, data });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;