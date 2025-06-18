const Expense = require('../models/Expense');

// Get a list of all unique people involved in expenses
exports.getPeople = async (req, res) => {
  const peopleSet = new Set();
  const expenses = await Expense.find();

  expenses.forEach(exp => {
    peopleSet.add(exp.paid_by); // Add payer
    exp.participants.forEach(p => peopleSet.add(p)); // Add each participant
  });

  res.json({ success: true, data: Array.from(peopleSet) });
};

// Calculate net balances of each person
exports.getBalances = async (req, res) => {
  const balances = {};
  const expenses = await Expense.find();

  expenses.forEach(exp => {
    const splitAmount = exp.amount / exp.participants.length;

    exp.participants.forEach(person => {
      if (!balances[person]) balances[person] = 0;
      balances[person] -= splitAmount; // Each participant owes
    });

    balances[exp.paid_by] = (balances[exp.paid_by] || 0) + exp.amount; // Payer gets credited
  });

  res.json({ success: true, data: balances });
};

// Generate optimal settlements between people to clear dues
exports.getSettlements = async (req, res) => {
  try {
    const balances = {};
    const expenses = await Expense.find();

    // Calculate balances similar to getBalances
    expenses.forEach(exp => {
      const splitAmount = exp.amount / exp.participants.length;

      exp.participants.forEach(person => {
        if (!balances[person]) balances[person] = 0;
        balances[person] -= splitAmount;
      });

      balances[exp.paid_by] = (balances[exp.paid_by] || 0) + exp.amount;
    });

    // Round off balances to 2 decimal places
    Object.keys(balances).forEach(person => {
      balances[person] = parseFloat(balances[person].toFixed(2));
    });

    const owes = [], owed = [];

    // Separate people into those who owe and those who are owed
    for (const [person, balance] of Object.entries(balances)) {
      if (balance < -0.01) owes.push({ person, amount: -balance });
      else if (balance > 0.01) owed.push({ person, amount: balance });
    }

    const settlements = [];
    let i = 0, j = 0;

    // Settle amounts between people
    while (i < owes.length && j < owed.length) {
      const min = Math.min(owes[i].amount, owed[j].amount);

      settlements.push({
        from: owes[i].person,
        to: owed[j].person,
        amount: parseFloat(min.toFixed(2))
      });

      owes[i].amount -= min;
      owed[j].amount -= min;

      if (owes[i].amount < 0.01) i++;
      if (owed[j].amount < 0.01) j++;
    }

    res.json({ success: true, data: settlements });
  } catch (err) {
    console.error("Error in getSettlements:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
