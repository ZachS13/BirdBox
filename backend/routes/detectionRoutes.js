const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/:id', async (req, res, next) => {
    try {
        const data = await business.getDetectionById(req.params.id);
        res.status(200).json({ ok: true, data });
    } catch (err) {
        next(err);
    }
});

module.exports = router;