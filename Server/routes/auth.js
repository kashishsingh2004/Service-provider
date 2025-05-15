const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const School = require('../models/School');
const Teacher = require('../models/Teacher');

// Register a user (school or teacher)
router.post('/register', async (req, res) => {
    console.log('Received registration request:', req.body);
    const { name, email, password, userType, address, qualifications, experience, subjects } = req.body;

    try {
        let user;
        if (userType === 'school') {
            console.log('Checking if school exists with email:', email);
            user = await School.findOne({ email });
            if (user) {
                console.log('School already exists:', email);
                return res.status(400).json({ msg: 'School already exists' });
            }
            console.log('Creating new school:', { name, email, address });
            user = new School({ name, email, password, address });
        } else {
            console.log('Checking if teacher exists with email:', email);
            user = await Teacher.findOne({ email });
            if (user) {
                console.log('Teacher already exists:', email);
                return res.status(400).json({ msg: 'Teacher already exists' });
            }
            console.log('Creating new teacher:', { name, email, qualifications, experience, subjects });
            user = new Teacher({ name, email, password, qualifications, experience, subjects });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        console.log('Saving user to database...');
        await user.save();
        console.log('User saved successfully:', user);

        req.session.user = {
            id: user.id,
            userType,
            name: user.name,
            email: user.email,
        };

        res.json({ user: { id: user.id, name, email, userType } });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login a user (school or teacher)
router.post('/login', async (req, res) => {
    console.log('Received login request:', req.body);
    const { email, password, userType } = req.body;

    try {
        let user;
        if (userType === 'school') {
            console.log('Looking for school with email:', email);
            user = await School.findOne({ email });
        } else {
            console.log('Looking for teacher with email:', email);
            user = await Teacher.findOne({ email });
        }

        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match for user:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        req.session.user = {
            id: user.id,
            userType,
            name: user.name,
            email: user.email,
        };

        console.log('User logged in successfully:', email);
        res.json({ user: { id: user.id, name: user.name, email, userType } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;