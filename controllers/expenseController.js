const { Expense, Balance } = require("../models");

exports.addExpense = async (req, res) => {
  try {
    const { name, value, currency, date, members } = req.body;
    const { userId } = req.params;
    
    const expense = await Expense.create({
      name,
      value,
      currency,
      date,
      userId: userId,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { name, value, currency, date } = req.body;

    const expense = await Expense.findByPk(expenseId);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    expense.name = name || expense.name;
    expense.value = value || expense.value;
    expense.currency = currency || expense.currency;
    expense.date = date || expense.date;
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await expense.destroy();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
};

exports.getExpensesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.findAll({
      where: { userId: userId },
    });

    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found for this user" });
    }

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};
