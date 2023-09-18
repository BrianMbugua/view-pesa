const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true]
        },
        amount: {
            type: Number,
            required: [true]
        },
        date: {
            type: String,
            required: [true]
        },
        description: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true],
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;