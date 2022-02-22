const db = require("../models");

// Defining methods for the usersController
module.exports = {
  findAll: async function (req, res) {
    const auth = req.currentUser;
    if(auth){
      db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err))  
    } else { 
      res.status(403).send('Not authorized');
    }   
  },
  findById: async function (req, res) {
    const auth = req.currentUser;
    
    if (auth) {
    db.User.findOne({firebase_uid: req.params.id})
    .then((user) => {
      res.json(user)
    })
    .catch((err) => res.status(422).json(err));
    } else {
      return res.status(403).send('Not authorized');
    }
  },
  create: function (req, res) {
    const auth = req.currentUser;
    
    if(auth) {
      db.User.create(req.body.obj)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
    } else {
      return res.status(403).send('Not authorized');
    }
    
  },
  update: function (req, res) {
    const auth = req.currentUser;
  
    if(auth) {
    db.User.findOneAndUpdate({ firebase_uid: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
    } else {
      return res.status(403).send('Not authorized');
    }
    
  },
  remove: function (req, res) {
    const auth = req.currentUser;
    if(auth) {
    db.User.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
    }
    return res.status(403).send('Not authorized');
  },
};