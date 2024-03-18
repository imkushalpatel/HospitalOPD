const express = require('express');
const router = express.Router();

const visitController = require('../controllers/visitController');

router.get('/', visitController.getAllVisits);
router.post('/', visitController.createVisit);
router.get('/:id', visitController.getVisitById);
router.put('/:id', visitController.updateVisit);
router.delete('/:id', visitController.deleteVisit);

module.exports = router;
