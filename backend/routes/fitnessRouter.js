const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
    getFitnessData,
    createFitnessData,
    getFitnessDataById,
    updateFitnessData,
    deleteFitnessData
} = require('../controllers/fitnessController');

router.use(requireAuth);

router.get('/', getFitnessData);
router.post('/', createFitnessData);
router.get('/:id', getFitnessDataById);
router.put('/:id', updateFitnessData);
router.delete('/:id', deleteFitnessData);

module.exports = router;