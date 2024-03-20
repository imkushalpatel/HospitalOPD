const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  _id: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expires: Date,
});

module.exports = mongoose.model("Session", sessionSchema);
