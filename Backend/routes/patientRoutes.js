const express = require("express");
const router = express.Router();
const joiMiddleware = require("../middleware/joiMiddleware");
const lodash = require("lodash");
const Constants = require("../constants");
const Joi = require("joi");

const patientController = require("../controllers/patientController");

router.get("/", patientController.getAllPatients);
router.get("/today", patientController.getTodayPatients);
router.post(
  "/",
  joiMiddleware(
    Joi.object().keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().allow(null, ""),
      phone: Joi.string().allow(null, ""),
      gender: Joi.string()
        .valid(...lodash.values(Constants.GENDER))
        .trim()
        .required(),
      // age: Joi.number().positive().precision(0).min(1).max(150).required(),
      DOB: Joi.date().less("now").required(),
      // height: Joi.number().positive().required(),
      // weight: Joi.number().positive().required(),
      // BP: Joi.string().required(),
    }),
    "body"
  ),
  patientController.createPatient
);
router.get(
  "/:id",
  // joiMiddleware(Joi.object().keys({
  //     id: Joi.string().alphanum().required()
  // }), 'query')
  // ,
  patientController.getPatientById
);

router.put(
  "/:id",
  // joiMiddleware(Joi.object().keys({
  //     id: Joi.string().alphanum().required()
  // }), 'query'
  // ),
  joiMiddleware(
    Joi.object().keys({
      name: Joi.string().required(),
      gender: Joi.string()
        .valid(...lodash.values(Constants.GENDER))
        .trim()
        .required(),
      age: Joi.number().positive().precision(0).min(1).max(150).required(),
      DOB: Joi.date().less("now").required(),
      height: Joi.number().positive().required(),
      weight: Joi.number().positive().required(),
      BP: Joi.string().required(),
    }),
    "body"
  ),
  patientController.updatePatient
);
router.delete("/:id", patientController.deletePatient);

module.exports = router;
