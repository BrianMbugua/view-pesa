const asyncMiddleware = require('../middlewares/asyncMiddleware')
const Transaction = require('../models/transaction')
const Wallet = require('../models/wallet')



const addTransaction = asyncMiddleware( async(req, res) => {

    const getWallet = await Wallet.findOne({ name: req.body.wallet })

    const walletOwner = getWallet
    console.log("Wallet Owner", walletOwner )
    const {category, amount, description, wallet} = req.body

    const created_transaction = await Transaction.create({
        category, amount, description, wallet, owner: walletOwner._id
    })
    console.log("Wallet Owner", walletOwner )
    res.status(201).send(created_transaction)
})
 
const getTransactions = asyncMiddleware( async(req, res) => {
    const user = req.user
    const transactions = await Transaction.find({ owner: user._id })
    res.status(201).send(transactions)
})

const deleteTransaction = asyncMiddleware( async(req, res) => {
    const user = req.user
    const transactions = await Transaction.findById(req.params.id)

    console.log(transactions)

    if (transactions.owner.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error ("Unauthorized access, invalid user")
    }

    await Transaction.findByIdAndRemove(req.params.id)
    res.send(204).end()
})

const updateTransaction = asyncMiddleware( async (req, res) => {
    const user = req.user
    const id = req.params.id

    const transaction = await Transaction.findById(id)

    if (transaction.owner.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error ("Unauthorized access, invalid user")
    }

    const updated_transaction = await Transaction.findByIdAndUpdate( id, {
        category: req.body.category, 
        amount: req.body.amount, 
        date: req.body.date, 
        description: req.body.description
    }, {new: true})

    res.status(200).send(updated_transaction)
}) 

module.exports = {
    addTransaction, 
    getTransactions,
    updateTransaction,
    deleteTransaction
}