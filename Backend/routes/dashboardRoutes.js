const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/doctor", dashboardController.getDoctorDashboard);
router.get("/nurse", dashboardController.getNurseDashboard);
router.get("/internNurse", dashboardController.getInternNurseDashboard);

module.exports = router;
