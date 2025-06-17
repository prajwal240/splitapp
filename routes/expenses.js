const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/expensesController');

router.get('/', ctrl.getAllExpenses);
router.post('/', ctrl.addExpense);
router.put('/:id', ctrl.updateExpense);
router.delete('/:id', ctrl.deleteExpense);

module.exports = router;
