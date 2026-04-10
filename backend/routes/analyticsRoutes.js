const express = require('express');
const router = express.Router();
const business = require('../businessLayer');

router.get('/identified-species', async (req, res, next) => {
    try { res.status(200).json({ success: true, data: await business.analyticsIdentifiedSpecies() }); }
    catch (err) { next(err); }
});

router.get('/monthly-activity', async (req, res) => {
    try{
        const result = await business.analyticsMonthlyActivity();
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        const status = error.message || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/weekly-activity', async (req, res, next) => {
    try { 
        const result = await business.analyticsWeeklyActivity();
        res.status(200).json({ success: true, data: result }); 
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/daily-activity', async (req, res, next) => {
    try { 
        const result = await business.analyticsDailyActivity();
        res.status(200).json({ success: true, data: result }); 
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/activity/:date', async (req, res, next) => {
    const { date } = req.params;
    try {
        const result = await business.analyticsActivityByDate(date);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/target-efficiency', async (req, res, next) => {
    try { res.status(200).json({ success: true, data: await business.analyticsTargetEfficiency() }); }
    catch (err) { next(err); }
});

module.exports = router;