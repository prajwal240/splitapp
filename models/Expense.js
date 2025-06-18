const mongoose = require('mongoose');

// Define schema for an expense entry
const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },        // Total amount of the expense
  description: { type: String, required: true },   // Description of the expense
  paid_by: { type: String, required: true },       // Person who paid
  participants: [{ type: String, required: true }],// People sharing the expense
}, { timestamps: true });                          // Auto add createdAt and updatedAt

// Export the Expense model
module.exports = mongoose.model('Expense', expenseSchema);
