const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/log/:id', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.getMaintenanceLogById(req.params.id) }); }
    catch (err) { next(err); }
});

router.get('/schedule/:id', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.getMaintenanceScheduleById(req.params.id) }); }
    catch (err) { next(err); }
});

module.exports = router;