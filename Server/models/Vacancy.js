const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    subject: { type: String, required: true },
    classLevel: { type: String, required: true },
    salary: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vacancy', vacancySchema);