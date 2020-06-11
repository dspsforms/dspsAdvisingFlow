const mongoose = require('mongoose');

const metaHistorySchema = require('./meta-history-schema');

const userSchema = mongoose.Schema({
  email: { type: String, required: true , index: true,  unique: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: Object},
  isAdmin: { type: Boolean, index: true },
  isStaff: { type: Boolean, index: true },
  isFaculty: { type: Boolean, index: true },
  isInstructor: { type: Boolean, index: true },
  isStudent: { type: Boolean, index: true },
  created: { type: Date },
  lastMod: { type: Date },
  // history of changes to password etc.
  // each entry in array of the form {ip: ip-address, date: date, type: 'password'}
  metaHistoryArr: [metaHistorySchema],
});

module.exports = mongoose.model('user', userSchema);
