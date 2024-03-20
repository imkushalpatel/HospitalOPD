const mongoose = require("mongoose");
const lodash = require("lodash");
const Constants = require("../constants");

const patientSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    gender: {
      type: String,
      enum: lodash.values(Constants.GENDER),
      required: true,
    },
    // age: { type: Number, required: true },
    DOB: { type: Date, required: true },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // visits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Visit" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
