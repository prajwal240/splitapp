const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/settlementsController');

// Routes for people, balances, and settlements
router.get('/people', ctrl.getPeople);           // Get unique list of all people involved
router.get('/balances', ctrl.getBalances);       // Get net balance of each person
router.get('/settlements', ctrl.getSettlements); // Get settlement details to clear balances

module.exports = router;
