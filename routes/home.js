const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const isAuth = require('../route protection/isAuth')
router.get('/home',isAuth,homeController.getHome)
router.get('/',isAuth,homeController.getHome)
router.get('/profile',isAuth,homeController.getProfile)
router.post('/editProfile',isAuth,homeController.postEditProfile)

module.exports=router