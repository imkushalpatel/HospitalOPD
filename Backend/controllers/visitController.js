const Visit = require("../models/Visit");

exports.getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.find().populate("patient");
    res.json(visits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getTodayVisits = async (req, res) => {
  try {
    var now = new Date();
    var startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const visits = await Visit.find({
      $or: [
        { createdAt: { $gte: startOfToday } },
        { updatedAt: { $gte: startOfToday } },
      ],
    }).populate("patient");
    res.json(visits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createVisit = async (req, res) => {
  try {
    const visit = new Visit(req.body);
    await visit.save();
    res.status(201).json({ message: "Visit created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id).populate("patient");
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }
    res.json(visit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateVisit = async (req, res) => {
  try {
    await Visit.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Visit updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteVisit = async (req, res) => {
  try {
    await Visit.findByIdAndDelete(req.params.id);
    res.json({ message: "Visit deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
