const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const walletRouter = express.Router();
const { addWallet,
        deleteWallet,
        getWallet,
        updateWallet   } = require('../controllers/wallet.controller')

walletRouter.route('/wallet')
    .all(authMiddleware)
    .get(getWallet)
    .post(addWallet)

walletRouter.route('/:id')
    .all(authMiddleware)
    .delete(deleteWallet)
    .put(updateWallet)

module.exports = walletRouter