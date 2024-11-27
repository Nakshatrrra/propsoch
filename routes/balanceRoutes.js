const express = require('express');
const balanceController = require('../controllers/balanceController');
const router = express.Router();


router.get('/balances/:id', balanceController.getBalances);

module.exports = router;
