const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class Wallet {
  constructor(balance, history,_id) {
    this.balance = balance;
    this.history = history;
    this._id = _id;
    //this._id = id ? new mongodb.ObjectId(id) : null;
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
    return db.collection('eachWallets').insertOne(this)
    .then(result=>{
         (this._id)
    })
    .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
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

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }

  static checkBalance(id){
    const db = getDb();
    return db
    .collection('eachWallets')
    .findOne({_id:id})
    .then(wallet=>{
        console.log(`wallet balance is ${wallet.balance}`)
        return wallet.balance
    })
    .catch(err=>{
        console.log(err)
    })
  }


  static getWalletHistory(id){
    const db = getDb();
    return db
    .collection('eachWallets')
    .findOne({_id:id})
    .then(wallet=>{
      console.log(wallet.history)
      return wallet.history.reverse()
    }
    )

  }

  static addToWallet(id,amount,des){
    const db = getDb();
   return db
    .collection('eachWallets')
  .updateOne({_id:id},{$inc:{balance:amount}, })
    .then(
      result=>{
        
        db
    .collection('eachWallets')
    .findOne({_id:id})
    .then(wallet=>{
        console.log(`wallet balance is ${wallet.balance}`)
        return wallet.balance
    }).then(balance=>{
      console.log(`Your balance is ${balance}`)

      db
    .collection('eachWallets')
  .updateOne({_id:id},{ $push:{
    history : {
      id : new mongodb.ObjectID(),
      type : "Add Money",
      amount : amount,
      balance : balance,
      des : des,
      date : new Date()
    }
  }  })
    })
      }
    )
    


  }

  static fetchTransaction(wId,tId){
    const db = getDb();
    return db
    .collection('eachWallets')
    .findOne({_id:wId})
    .then(wallet=>{
      for(let h in wallet.history){
        if(wallet.history[h].id == tId){
          console.log(`trabsaction fetched are ${wallet.history[h]}`)
          return wallet.history[h]
        }
      }
    })
  }
}

module.exports = Wallet;
