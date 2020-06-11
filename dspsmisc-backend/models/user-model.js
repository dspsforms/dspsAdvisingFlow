const mongoose = require('mongoose');

const metaHistorySchema = require('./meta-history-schema');

const userSchema = mongoose.Schema({
  email: { type: String, required: true , index: true,  unique: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: Object },
  isDsps: { type: Boolean, index: true }, // for quick look up of DSPS users
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

userSchema.pre('save', function(next) {
  this.isDsps = this.isAdmin || this.isStaff || this.isFaculty;
  console.log("from userSchema.pre-save. this=", this);
  next();
});

module.exports = mongoose.model('user', userSchema);
