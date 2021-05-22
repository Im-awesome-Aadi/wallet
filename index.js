const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const MONGODB_URI ='mongodb+srv://Aditya:Aditya@cluster0.zscnr.mongodb.net/wallet';
const User = require('./models/user');
const flash = require('connect-flash')
const mongoConnect = require('./utils/database').mongoConnect;
const homeRoute = require('./routes/home')
const walletRoute = require('./routes/wallet')
const authRoute = require('./routes/auth');
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(flash())   // initialize this middleware after iniializing session middleware
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(homeRoute)
app.use(walletRoute)
app.use(authRoute)


app.use((req, res, next) => {
  
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });

  });

mongoConnect(() => {
    app.listen(3000);
  });
