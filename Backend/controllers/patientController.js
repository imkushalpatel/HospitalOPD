const Patient = require("../models/Patient");
const Visit = require("../models/Visit");

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("createdby", {
      password: 0,
    });
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTodayPatients = async (req, res) => {
  try {
    var now = new Date();
    var startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const patients = await Patient.find({
      $or: [
        { createdAt: { $gte: startOfToday } },
        { updatedAt: { $gte: startOfToday } },
      ],
    }).populate("createdby", {
      password: 0,
    });
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createPatient = async (req, res) => {
  try {
    req.body.createdby = req.session.user;
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: "Patient created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    console.log(req.body);
    await Patient.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Patient updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    await Visit.deleteMany({ patient: req.params.id });
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
