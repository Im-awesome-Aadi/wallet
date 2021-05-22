const express = require('express')
const router = express.Router()
const walletController = require('../controllers/wallet')
const isAuth = require('../route protection/isAuth')

router.get('/addtowallet',isAuth,walletController.getAddToWallet)
router.post('/addtowallet',isAuth,walletController.postAddToWallet)
router.get('/wallet',isAuth,walletController.getWallet)
router.get('/view_transactions/:id',isAuth,walletController.getViewTransaction)
module.exports=router