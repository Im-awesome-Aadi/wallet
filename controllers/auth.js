const User = require('../models/user');
const mongodb = require('mongodb');

const bcrypt = require('bcryptjs')
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    errorMessage : req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    errorMessage : req.flash('error')
  });
};

exports.postLogin = (req, res, next) => {
  const mobile = req.body.mobile;
  const password = req.body.password;
  User.findByMobile(mobile)
  .then(
    user=>{
      if(!user){
        req.flash('error','Invalid Mobile Number or Password')
        return res.redirect('/login')
      }
      bcrypt.compare(password,user.password)
      .then(doMatch=>{
        if(doMatch){
          req.session.isLoggedIn = true;
         req.session.user = user;
      return req.session.save(err => {
        console.log(err);
        res.redirect('/home');
      });
        }
        else{
        req.flash('error','Invalid Mobile Number or Password')

        }
        res.redirect('/login')

      })
  .catch(err=>{
    res.redirect('/login')
    console.log(err)})
    }
  )
  .catch(err=>console.log(err))
  
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const mobile = req.body.mobile;
  const password = req.body.password;
  const confirmpassword=req.body.confirmpassword;
  User.findByMobile(mobile)
  .then(userDoc=>{
    if(userDoc){
      req.flash('error','Account Already Exist')
      return res.redirect('/signup')
    }

    return bcrypt.hash(password,12).then(hashed=>{
      const user = new User(
        name,
        mobile,
        hashed,
        new mongodb.ObjectID()
      )
      return user.save()
      .then(result=>{
          console.log(`result is ${result}`)
        res.redirect('/login')
      })
    })
    
  }) 
  .catch(err=>console.log(err))

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
