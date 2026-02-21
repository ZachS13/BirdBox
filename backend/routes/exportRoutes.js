const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/', async (req, res) => {
    try { 
        const expList = await business.listExports();
        res.status(200).json({ ok: true, data: expList }); 
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try { 
        const exp = await business.getExportById(req.params.id);
        res.status(200).json({ ok: true, data: exp }); 
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try { 
        res.status(201).json({ ok: true, data: await business.createExport(req.body) });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;