const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Vacancy = require('../models/Vacancy');

// Apply to a vacancy (teacher only)
router.post('/', auth, async (req, res) => {
    const { vacancyId } = req.body;
    try {
        if (req.user.userType !== 'teacher') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const vacancy = await Vacancy.findById(vacancyId);
        if (!vacancy) {
            return res.status(404).json({ msg: 'Vacancy not found' });
        }
        const application = new Application({
            teacher: req.user.id,
            vacancy: vacancyId,
        });
        await application.save();
        res.json(application);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get applications for a vacancy (school only)
router.get('/vacancy/:vacancyId', auth, async (req, res) => {
    try {
        if (req.user.userType !== 'school') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const vacancy = await Vacancy.findById(req.params.vacancyId);
        if (!vacancy || vacancy.school.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const applications = await Application.find({ vacancy: req.params.vacancyId }).populate(
            'teacher',
            'name qualifications experience subjects'
        );
        res.json(applications);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get applications by teacher (teacher only)
router.get('/my-applications', auth, async (req, res) => {
    try {
        if (req.user.userType !== 'teacher') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const applications = await Application.find({ teacher: req.user.id }).populate(
            'vacancy',
            'subject classLevel salary'
        );
        res.json(applications);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;