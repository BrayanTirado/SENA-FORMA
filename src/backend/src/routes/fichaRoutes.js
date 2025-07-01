const express = require('express');
const router = express.Router();
const fichaController = require('../controllers/fichaController');

router.get('/fichas', fichaController.getAllFichas);
router.delete('/fichas/:id', fichaController.deleteFicha);

module.exports = router;