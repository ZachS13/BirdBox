const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.listExports() }); }
    catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.getExportById(req.params.id) }); }
    catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
    try { res.status(201).json({ ok: true, data: await business.createExport(req.body) }); }
    catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.deleteExport(req.params.id) }); }
    catch (err) { next(err); }
});

module.exports = router;