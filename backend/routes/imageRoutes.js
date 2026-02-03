const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/:id', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.getImageById(req.params.id) }); }
    catch (err) { next(err); }
});

router.get('/:id/download', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.downloadImageById(req.params.id) }); }
    catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.deleteImageById(req.params.id) }); }
    catch (err) { next(err); }
});

module.exports = router;