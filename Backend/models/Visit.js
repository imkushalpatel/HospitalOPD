const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorNotes: { type: String },
  testRequested: { type: String },
  testResults: { type: String },
  prescriptions: { type: String },
  diagnosis: { type: String },
});

module.exports = mongoose.model("Visit", visitSchema);
