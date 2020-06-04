const mongoose = require('mongoose');

const metaHistorySchema = require('./meta-history-schema');

const userSchema = mongoose.Schema({
  email: { type: String, required: true ,  unique: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: Object},
  isAdmin: { type: Boolean },
  isStaff: { type: Boolean },
  isFaculty: { type: Boolean },
  isInstructor: { type: Boolean },
  isStudent: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  // history of changes to password etc.
  // each entry in array of the form {ip: ip-address, date: date, type: 'password'}
  metaHistoryArr: [metaHistorySchema],
});

module.exports = mongoose.model('user', userSchema);
