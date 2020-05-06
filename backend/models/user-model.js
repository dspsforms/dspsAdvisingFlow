const mongoose = require('mongoose');

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
  lastMod: { type: Date }
});

module.exports = mongoose.model('user', userSchema);
