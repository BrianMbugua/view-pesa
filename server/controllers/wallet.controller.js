const asyncMiddleware = require('../middlewares/asyncMiddleware')
const Wallet = require('../models/wallet');
const bcrypt = require('bcryptjs')
const customJwt = require('../utils/jwt')

const addWallet = asyncMiddleware(async(req, res) => {
    const user = req.user
    const { name, amount, description } = req.body
    console.log("Body wallet")
    const wallet = await Wallet.create({
        name, amount, description, owner: user._id
    })
    res.status(201).send(wallet)
    
})

const getWallet = asyncMiddleware(async (req, res) => {
    const user = req.user
    const wallet = await Wallet.find({ owner: user._id.toString() });
    if(wallet !== null){
       // console.log(wallet)
    }else{
        console.log("Not found wallet")
    }
    res.status(200).json(wallet)
    
} ) 

const updateWallet = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const wallet = await Wallet.findByIdAndUpdate(id, req.body);
    if (!wallet) {
        throw new Error({ message: `Not found` })
    }
    const updatedWallet = await Wallet.findById(id);
    res.status(200).json(updatedWallet);
}) 

const deleteWallet = asyncMiddleware(async(req, res) => {
    const { id } = req.params;
    const wallet = await Wallet.findByIdAndDelete(id);
    if (!wallet) {
        throw new Error("Wallet not found")
    }
    res.status(201).json({ message: "Success"});
})

module.exports = {
    addWallet, 
    deleteWallet,
    getWallet,
    updateWallet
}