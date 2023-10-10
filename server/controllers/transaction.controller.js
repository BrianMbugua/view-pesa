const asyncMiddleware = require('../middlewares/asyncMiddleware')
const Transaction = require('../models/transaction')
const Wallet = require('../models/wallet')



const addTransaction = asyncMiddleware( async(req, res) => {

    const getWallet = await Wallet.findOne({ name: req.body.wallet })

    
    const {category, amount, description, wallet} = req.body

    //Transaction impact Calculation
    let new_balance = amount + getWallet.amount
    // 
    const id = getWallet._id;
    console.log("New Balance ",id )
    
    const wallet_transaction = await Wallet.findByIdAndUpdate(id, {
    amount: new_balance
    }, {new: true});
    if (!wallet_transaction) {
        throw new Error({ message: `Not found` })
    }
    
    
    console.log("wallet_transaction: ", wallet_transaction )
   
    // const updatedWallet = await Wallet.findById(id);
    // console.log("Updated wallet ", wallet_transaction )
    const created_transaction = await Transaction.create({
        category, amount, description, wallet, owner: getWallet._id
    })
    console.log("Backend transaction", created_transaction )
    res.status(201).send(created_transaction)
})
 
const getTransactions = asyncMiddleware( async(req, res) => {
    const wallet = await Wallet.findOne({ name: 'M-PESA' })
    // console.log("Get transactions request body ",req)
    const transactions = await Transaction.find({ owner: wallet._id })
    res.status(201).send(transactions)
})

const deleteTransaction = asyncMiddleware( async(req, res) => {
    const user = req.user
    const transactions = await Transaction.findById(req.params.id)

    // console.log(transactions)

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
    deleteTransaction,
}