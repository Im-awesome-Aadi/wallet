const Wallet = require('../models/wallet')

exports.getAddToWallet=(req,res,next)=>{
    res.render('addtowallet',{
        path:'/addtowallet',
        isAuthenticated: req.session.isLoggedIn,
        title:"Add to Wallet"
    })
}

exports.postAddToWallet=(req,res,next)=>{
    const amount = parseInt(req.body.amount)
    const des = req.body.des
    console.log(amount)
    Wallet.addToWallet(req.user.walletId,amount,des)
    .then(result=>{
    res.redirect('/home')

    })
}

exports.getWallet=(req,res,next)=>{
    Wallet.getWalletHistory(req.user.walletId)
    .then((history)=>{
        console.log(`hsi is ${history}`)
        Wallet.checkBalance(req.user.walletId)
    .then(balance=>{
        console.log(`balance is ${balance}`)
        res.render('wallet',{
            path:'/wallet',
            balance : balance,
            history:history,
        isAuthenticated: req.session.isLoggedIn,
        title:"Wallet"


        })
    })
    }    )
    
}

exports.getViewTransaction=(req,res,next)=>{
    const tId = req.params.id
    Wallet.fetchTransaction(req.user.walletId,tId)
    .then(
        result=>{
            console.log(`result s ${result}`)
            res.render('view_transaction',{
                path:'/wallet',
                transactionData : result,
        isAuthenticated: req.session.isLoggedIn,
        title:"Transaction"


            })
        }
    )
}