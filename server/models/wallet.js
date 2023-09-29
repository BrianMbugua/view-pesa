const mongoose = require('mongoose');

const walletShema = new mongoose.Schema(
    {   
        name: {
            type: String,
            unique: true,
            required: [true]
        },
        amount: {
            type: Number,
            required: [true]
        },
        
        description: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true],
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const Wallet = mongoose.model('Wallet', walletShema);

module.exports = Wallet;