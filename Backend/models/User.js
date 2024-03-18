const mongoose = require('mongoose');
const lodash = require("lodash");
const Constants = require("../constants");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: lodash.values(Constants.ROLES), required: true }
});

module.exports = mongoose.model('User', userSchema);
