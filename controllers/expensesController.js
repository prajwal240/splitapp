const Expense = require('../models/Expense');

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, description, paid_by, participants } = req.body;

    // Basic input validation
    if (!amount || amount <= 0 || !description || !paid_by || !participants.length)
      return res.status(400).json({ success: false, message: 'Invalid input' });

    const expense = new Expense({ amount, description, paid_by, participants });
    await expense.save(); // Save to DB

    res.status(201).json({ success: true, data: expense, message: 'Expense added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json({ success: true, data: expenses });
};

// Update an existing expense
exports.updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated)
      return res.status(404).json({ success: false, message: 'Expense not found' });

    res.json({ success: true, data: updated, message: 'Expense updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ success: false, message: 'Expense not found' });

    res.json({ success: true, message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
