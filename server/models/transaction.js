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
        description: {
            type: String,
        },
        wallet: {
            type: String,
            required: [true]
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true],
            ref: "Wallet"
        }
    },
    {
        timestamps: true
    }
)

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;