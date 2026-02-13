const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/', async (req, res) => {
    try { 
        res.status(200).json({ ok: true, data: await business.listSpecies() });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try { 
        res.status(200).json({ ok: true, data: await business.getSpeciesById(req.params.id) });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try { 
        res.status(201).json({ ok: true, data: await business.createSpecies(req.body) }); 
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try { 
        res.status(200).json({ ok: true, data: await business.updateSpecies(req.params.id, req.body)}); 
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try { 
        res.status(200).json({ ok: true, data: await business.deleteSpecies(req.params.id) })
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;