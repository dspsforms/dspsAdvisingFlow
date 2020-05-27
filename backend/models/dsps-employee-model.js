const mongoose = require('mongoose');

 // note: no need for password to be saved to dspsEmployee
const dspsEmployeeSchema = mongoose.Schema({
  userId: { type: String, required: true ,  unique: true},
  email: { type: String, required: true ,  unique: true},
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

module.exports = mongoose.model('dspsEmployee', dspsEmployeeSchema);
