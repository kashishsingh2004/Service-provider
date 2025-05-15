const express = require('express');
const router = express.Router();
const School = require('../models/School');

// Middleware to check if user is authenticated and is a school
const authMiddleware = (req, res, next) => {
    if (!req.session.user || req.session.user.userType !== 'school') {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    next();
};

// Get school profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const school = await School.findById(req.session.user.id).select('-password');
        if (!school) {
            return res.status(404).json({ msg: 'School not found' });
        }
        res.json(school);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update school profile
router.put('/profile', authMiddleware, async (req, res) => {
    const { name, address } = req.body;
    try {
        const school = await School.findById(req.session.user.id);
        if (!school) {
            return res.status(404).json({ msg: 'School not found' });
        }
        school.name = name || school.name;
        school.address = address || school.address;
        await school.save();
        res.json(school);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;