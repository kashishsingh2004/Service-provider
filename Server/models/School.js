const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    userType: { type: String, default: 'school' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('School', schoolSchema);