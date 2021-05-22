const Wallet = require('../models/wallet')
const User = require('../models/user')
exports.getHome=(req,res,next)=>{
    
    
    res.render('home',{
        path:'/home',
        title:"Home",
        name:req.user.name,
        isAuthenticated: req.session.isLoggedIn

        //req.user.name
    })
    

}

exports.getProfile=(req,res,next)=>{
    res.render("profile",{
        isAuthenticated: req.session.isLoggedIn,
        title:"Home",
        path : '/profile',
        user : req.user,
        title:"Your Profile"
    })
}

exports.postEditProfile=(req,res,next)=>{
    const updatedName= req.body.name
    const updatedMobile= req.body.mobile
    User.updateById(req.user._id,updatedName,updatedMobile)
    .then(user=>{
    res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
    })
}