const mongoose = require("mongoose");
const lodash = require("lodash");
const Constants = require("../constants");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: {
      type: String,
      enum: lodash.values(Constants.GENDER),
      required: true,
    },
    age: { type: Number, required: true },
    DOB: { type: Date, required: true },
    height: { type: Number },
    weight: { type: Number },
    BP: { type: String },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Visit" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
