const mongoose = require("mongoose");
const lodash = require("lodash");
const Constants = require("../constants");

const visitSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    height: { type: Number },
    weight: { type: Number },
    bp: {
      sys: { type: Number },
      dia: { type: Number },
      pul: { type: Number },
    },
    status: {
      type: String,
      enum: lodash.values(Constants.STATUS),
      default: Constants.STATUS.PENDING,
    },
    doctorNotes: { type: String },
    testRequested: { type: String },
    testResults: { type: String },
    prescriptions: { type: String },
    diagnosis: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visit", visitSchema);
