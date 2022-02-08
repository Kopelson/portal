const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true 
  },
  phone: {
    type: String,
  },
  suite: {
    type: String,
  },
  firebase_uid: {
    type: String,
  },
  receive_texts: {
    type: Boolean,
    default: 'true'
  },
  receive_emails: {
    type: Boolean,
    default: 'true'
  },
  receive_alerts: {
    type: Boolean,
    default: 'true'
  },
  roles: {
       type: [{type: String, enum: ['user', 'admin', 'mod'] }],
       default: ['user']
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;