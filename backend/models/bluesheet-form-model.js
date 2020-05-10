const mongoose = require('mongoose');

const bluesheetSchema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  // form: { type: String },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: { type: String },
  state: {type: String}
});

module.exports = mongoose.model('bluesheet', bluesheetSchema);
