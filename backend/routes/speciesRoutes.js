const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.listSpecies() }); }
    catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.getSpeciesById(req.params.id) }); }
    catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
    try { res.status(201).json({ ok: true, data: await business.createSpecies(req.body) }); }
    catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.updateSpecies(req.params.id, req.body) }); }
    catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
    try { res.status(200).json({ ok: true, data: await business.deleteSpecies(req.params.id) }); }
    catch (err) { next(err); }
});

module.exports = router;