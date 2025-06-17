const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/settlementsController');

router.get('/people', ctrl.getPeople);
router.get('/balances', ctrl.getBalances);
router.get('/settlements', ctrl.getSettlements);

module.exports = router;
