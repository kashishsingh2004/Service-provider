const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Teacher = require('../models/Teacher');

// Get teacher profile (protected route)
router.get('/profile', auth, async (req, res) => {
    try {
        if (req.user.userType !== 'teacher') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const teacher = await Teacher.findById(req.user.id).select('-password');
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update teacher profile (protected route)
router.put('/profile', auth, async (req, res) => {
    const { name, qualifications, experience, subjects } = req.body;
    try {
        if (req.user.userType !== 'teacher') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const teacher = await Teacher.findByIdAndUpdate(
            req.user.id,
            { name, qualifications, experience, subjects },
            { new: true }
        ).select('-password');
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;