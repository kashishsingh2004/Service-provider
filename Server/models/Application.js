const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    vacancy: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy', required: true },
    status: { type: String, default: 'pending' }, // 'pending', 'accepted', 'rejected'
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);