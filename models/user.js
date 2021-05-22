const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;
const Wallet = require('./wallet')
class User {
  constructor(name, mobile, password,walletId) {
    this.name = name;
    this.mobile = mobile;
    this.password = password;
    this.walletId = walletId;
    //this.userId = userId;
  }

  /* save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  } */

  save(){
    const db = getDb();
    const w = new Wallet(0,[],this.walletId)
    return db.collection('users').insertOne(this)
    .then(result=>{
        console.log(this.walletId)
        w.save()
    })
    .then(result=>{
        console.log("Added succesfully")

    }
    )
    .catch(err => {
        console.log(err);
      });
  }

  

  static findByMobile(mobile) {
      console.log(`find from ${mobile}`)
    const db = getDb();
    return db
      .collection('users')
      .find({ mobile: mobile })
      .next()
      .then(user => {
      //  console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }

  
  static findById(id) {
    console.log(`find from ${id}`)
  const db = getDb();
  return db
    .collection('users')
    .find({ _id: id })
    .next()
    .then(user => {
    //  console.log(user);
      return user;
    })
    .catch(err => {
      console.log(err);
    });
}
  static updateById(userId,updatedName,updatedMobile){
    const db = getDb();
    return db
      .collection('users')
      .updateOne({ _id: userId },{ $set :{name:updatedName,mobile:updatedMobile} })
      .then(result=>{
        console.log("updated success")
      })
  }
  
}

module.exports = User;
