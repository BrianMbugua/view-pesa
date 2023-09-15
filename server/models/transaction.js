const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true]
        },
        amount: {
            type: String,
            required: [true]
        },
        date: {
            type: String,
            required: [true]
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;