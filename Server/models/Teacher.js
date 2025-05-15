const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    qualifications: { type: String, required: true },
    experience: { type: String, required: true },
    subjects: { type: String, required: true },
    userType: { type: String, default: 'teacher' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Teacher', teacherSchema);