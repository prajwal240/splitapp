const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/expensesController');

// Routes for expense CRUD operations
router.get('/', ctrl.getAllExpenses);     // Get all expenses
router.post('/', ctrl.addExpense);        // Add a new expense
router.put('/:id', ctrl.updateExpense);   // Update an existing expense
router.delete('/:id', ctrl.deleteExpense); // Delete an expense

module.exports = router;
