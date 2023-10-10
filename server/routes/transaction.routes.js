const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transaction.controller')
const transactionRouter = express.Router();

transactionRouter
    .route('/')
    .all(authMiddleware)
    .get(getTransactions)
    .put(addTransaction)
    .post(addTransaction)
    

transactionRouter
    .route('/:id')
    .all(authMiddleware)
    .put(updateTransaction)
    .delete(deleteTransaction)

module.exports = transactionRouter