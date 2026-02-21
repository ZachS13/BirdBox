const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/:id', async (req, res) => {
    
    try {
        const image = await business.getImageById(req.params.id);
        res.status(200).json({ ok: true, data: image }); 
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id/download', async (req, res) => {
    try { 
        const download = await business.downloadImageById(req.params.id);
        res.status(200).json({ ok: true, data: download }); 
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
        const image = await business.deleteImageById(req.params.id);
        res.status(200).json({ ok: true, data: image }); 
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;