const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    _id: String,
    data: Object,
    expires: Date,
});

module.exports = mongoose.model('Session', sessionSchema);
