const Expense = require('../models/Expense');

exports.getPeople = async (req, res) => {
  const peopleSet = new Set();
  const expenses = await Expense.find();

  expenses.forEach(exp => {
    peopleSet.add(exp.paid_by);
    exp.participants.forEach(p => peopleSet.add(p));
  });

  res.json({ success: true, data: Array.from(peopleSet) });
};

exports.getBalances = async (req, res) => {
  const balances = {};
  const expenses = await Expense.find();

  expenses.forEach(exp => {
    const splitAmount = exp.amount / exp.participants.length;
    exp.participants.forEach(person => {
      if (!balances[person]) balances[person] = 0;
      balances[person] -= splitAmount;
    });
    balances[exp.paid_by] = (balances[exp.paid_by] || 0) + exp.amount;
  });

  res.json({ success: true, data: balances });
};

exports.getSettlements = async (req, res) => {
  const { data: balances } = await exports.getBalances({ query: {} }, { json: x => x });
  const owes = [], owed = [];

  for (const [person, balance] of Object.entries(balances)) {
    if (balance < -0.01) owes.push({ person, amount: -balance });
    else if (balance > 0.01) owed.push({ person, amount: balance });
  }

  const settlements = [];
  let i = 0, j = 0;

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
};
