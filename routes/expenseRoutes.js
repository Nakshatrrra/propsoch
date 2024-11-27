const express = require('express');
const router = express.Router();
const { addExpense, updateExpense, deleteExpense,getExpensesByUserId } = require('../controllers/expenseController');

router.post('/expenses/:userId', addExpense);

router.put('/expenses/:expenseId', updateExpense);

router.delete('/expenses/:id', deleteExpense);

router.get('/user/:userId', getExpensesByUserId); 

module.exports = router;
