const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Vacancy = require('../models/Vacancy');

// Create a vacancy (school only)
router.post('/', auth, async (req, res) => {
    const { subject, classLevel, salary } = req.body;
    try {
        if (req.user.userType !== 'school') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const vacancy = new Vacancy({
            school: req.user.id,
            subject,
            classLevel,
            salary,
        });
        await vacancy.save();
        res.json(vacancy);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all vacancies (public route)
router.get('/', async (req, res) => {
    try {
        const vacancies = await Vacancy.find().populate('school', 'name');
        res.json(vacancies);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get vacancies by school (school only)
router.get('/my-vacancies', auth, async (req, res) => {
    try {
        if (req.user.userType !== 'school') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const vacancies = await Vacancy.find({ school: req.user.id });
        res.json(vacancies);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;