const express = require("express");
const router = express.Router();
const joiMiddleware = require("../middleware/joiMiddleware");
const Joi = require("joi");

const visitController = require("../controllers/visitController");

router.get("/", visitController.getAllVisits);
router.get("/today", visitController.getTodayVisits);
router.post(
  "/",
  joiMiddleware(
    Joi.object().keys({
      doctorNotes: Joi.string().allow(null, ""),
      testRequested: Joi.string().allow(null, ""),
      testResults: Joi.string().allow(null, ""),
      prescriptions: Joi.string().allow(null, ""),
      diagnosis: Joi.string().allow(null, ""),
      height: Joi.number().positive().required(),
      weight: Joi.number().positive().required(),
      bp: Joi.object().keys({
        sys: Joi.number().positive().required(),
        dia: Joi.number().positive().required(),
        pul: Joi.number().positive().required(),
      }),
      patient: Joi.string().alphanum().required(),
    }),
    "body"
  ),
  visitController.createVisit
);
router.get("/:id", visitController.getVisitById);
router.put(
  "/:id",
  joiMiddleware(
    Joi.object()
      .keys({
        doctorNotes: Joi.string().allow(null, ""),
        testRequested: Joi.string().allow(null, ""),
        testResults: Joi.string().allow(null, ""),
        prescriptions: Joi.string().allow(null, ""),
        diagnosis: Joi.string().allow(null, ""),
        height: Joi.number().positive().required(),
        weight: Joi.number().positive().required(),
        bp: Joi.object().keys({
          sys: Joi.number().positive().required(),
          dia: Joi.number().positive().required(),
          pul: Joi.number().positive().required(),
        }),
      })
      .options({ stripUnknown: true }),
    "body"
  ),
  visitController.updateVisit
);
router.delete("/:id", visitController.deleteVisit);

module.exports = router;
