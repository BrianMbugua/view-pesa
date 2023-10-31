const asyncMiddleware = require('../middlewares/asyncMiddleware')
const Transaction = require('../models/transaction')
const Wallet = require('../models/wallet')



const addTransaction = asyncMiddleware( async(req, res) => {

    const getWallet = await Wallet.findOne({ name: req.body.wallet })
    const id = getWallet._id;
    
    const {category, amount, description, wallet} = req.body
    
    if(category == "Income"){
        let plus_balance = amount + getWallet.amount
        await Wallet.findByIdAndUpdate(id, {
            amount: plus_balance
            }, {new: true});
            console.log("New Balance ",plus_balance)

            const created_transaction = await Transaction.create({
                category, amount, description, wallet, owner: getWallet._id
            })
            console.log("Backend transaction", created_transaction )
            res.status(201).send(created_transaction)
    }else if(category == "Expense"){
        let minus_balance = getWallet.amount - amount 
        await Wallet.findByIdAndUpdate(id, {
            amount: minus_balance
            }, {new: true});
            console.log("New Balance ",minus_balance)
            const created_transaction = await Transaction.create({
                category, amount, description, wallet, owner: getWallet._id
            })
            console.log("Backend transaction", created_transaction )
            res.status(201).send(created_transaction)
        
    }else{
        throw new Error({ message: `Invalid category` })
    }


})
 
const getTransactions = asyncMiddleware( async(req, res) => {
    const user = req.user
    const wallets = await Wallet.find({ owner: user._id.toString() })
    // console.log("Get transactions request body ",req)
   let payload = Array();
    for (const wallet of wallets) {
        let transactions = await Transaction.find({ owner: wallet._id.toString() })
        payload.push(transactions)
        
    }
    console.log("This is the payload ", payload[1])
    res.json(payload)

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